import './vue-fullpage.scss'
var fullpage = {}
var opt = {
  start: 0,
  duration: 500,
  loop: false,
  dir: 'v',
  der: 0.1,
  movingFlag: false,
  preventWechat: false,
  needIndicator: false,
  beforeChange: function(data) {},
  afterChange: function(data) {}
}
window.onresize = () => {
  let that = fullpage
  let width = document.documentElement.clientWidth
  if (that.WinOnresizeTime) {
    return
  }
  that.WinOnresizeTime = setTimeout(() => {
    if (width > 810) {
      that.init(that.el, that.o)
    } else {
      that.destroy()
    }
    that.WinOnresizeTime = null
  }, 500)
}
fullpage.install = function(Vue, options) {
  var that = fullpage
  Vue.directive('fullpage', {
    inserted: function(el, binding, vnode) {
      var opts = binding.value || {}
      that.init(el, opts, vnode)
    },
    componentUpdated: function(el, binding, vnode) {
      var opts = binding.value || {}
      that.init(el, opts, vnode)
    }
  })

  Vue.directive('animate', {
    inserted: function(el, binding, vnode) {
      if (binding.value) {
        that.initAnimate(el, binding, vnode)
      }
    }
  })
}

fullpage.initAnimate = function(el, binding, vnode) {
  var that = fullpage
  var vm = vnode.context
  var aminate = binding.value
  el.style.opacity = '0'
  vm.$on('toogle_animate', function(curIndex) {
    var curPage = +el.parentNode.getAttribute('data-id')
    if (curIndex === curPage) {
      that.addAnimated(el, aminate)
    } else {
      el.style.opacity = '0'
      that.removeAnimated(el, aminate)
    }
  })
}

fullpage.addAnimated = function(el, animate) {
  var delay = animate.delay || 0
  el.classList.add('animated')
  window.setTimeout(function() {
    el.style.opacity = '1'
    el.classList.add(animate.value)
  }, delay)
}

fullpage.removeAnimated = function(el, animate) {
  if (el.getAttribute('class').indexOf('animated') > -1) {
    el.classList.remove(animate.value)
  }
}

fullpage.assignOpts = function(option) {
  var that = fullpage
  var o = option || {}
  for (var key in opt) {
    if (!o.hasOwnProperty(key)) {
      o[key] = opt[key]
    }
  }
  that.o = o
}

fullpage.initScrollDirection = function() {
  if (this.o.dir !== 'v') {
    this.el.classList.add('fullpage-wp-h')
  }
}

fullpage.scrollRun = function(e) {
  let that = fullpage
  let der = 0
  if (e.wheelDelta > 0) {
    // 兼容IE,Opera,Chrome
    der = -1
  } else if (e.detail > 0) {
    // 兼容Firefox
    der = -1
  } else {
    der = 1
  }
  if (that.scrollRunTime) {
    return
  }
  that.scrollRunTime = setTimeout(() => {
    let nextIndex = that.curIndex + der
    if (nextIndex >= 0 && nextIndex < that.total) {
      that.moveTo(nextIndex, true)
    } else {
      if (that.o.loop) {
        nextIndex = nextIndex < 0 ? that.total - 1 : 0
        that.moveTo(nextIndex, true)
      } else {
        that.curIndex = nextIndex < 0 ? 0 : that.total - 1
      }
    }
    clearTimeout(that.scrollRunTime)
    that.scrollRunTime = null
  }, that.o.duration)
}
fullpage.destroy = function() {
  let that = fullpage
  that.el.removeEventListener('mousewheel', that.scrollRun, { passive: true })
  for (var i = 0; i < that.pageEles.length; i++) {
    var pageEle = that.pageEles[i]
    pageEle.setAttribute('data-id', i)
    pageEle.style.width = ''
    pageEle.style.height = ''
    pageEle.removeEventListener('touchstart', that.touchstart, { passive: true })
    pageEle.removeEventListener('touchend', that.touchend, { passive: true })
  }
  if (that.el.parentNode.children[1]) {
    that.el.parentNode.removeChild(that.el.parentNode.children[1])
  }
}
fullpage.init = function(el, options, vnode) {
  var that = fullpage
  that.assignOpts(options)
  if (vnode) {
    that.vm = vnode.context
    that.vm.$fullpage = that
  }
  that.curIndex = that.o.start

  that.startY = 0
  that.o.movingFlag = false

  that.el = el
  that.el.classList.add('fullpage-wp')

  that.parentEle = that.el.parentNode
  that.parentEle.classList.add('fullpage-container')

  that.pageEles = that.el.children
  that.total = that.pageEles.length

  that.initScrollDirection()

  if (document.addEventListener) {
    el.addEventListener('DOMMouseScroll', that.scrollRun, { passive: true })
  }
  el.addEventListener('mousewheel', that.scrollRun, { passive: true })
  window.setTimeout(function() {
    that.width = that.parentEle.offsetWidth
    that.height = that.parentEle.offsetHeight

    for (var i = 0; i < that.pageEles.length; i++) {
      var pageEle = that.pageEles[i]
      pageEle.setAttribute('data-id', i)
      pageEle.classList.add('page')
      pageEle.style.width = that.width + 'px'
      pageEle.style.height = that.height + 'px'
      that.initEvent(pageEle)
    }
    if (that.o.needIndicator) {
      that.addIndicator()
    }
    that.moveTo(that.curIndex, false)
  }, 0)
}

fullpage.addIndicator = function() {
  let that = fullpage
  let ulDom = document.createElement('ul')
  if (that.el.parentNode.children.length > 1) {
    return
  }
  for (let i = 0; i < that.pageEles.length; i++) {
    let LiDom = document.createElement('li')
    LiDom.setAttribute('data-index', i)
    LiDom.addEventListener('click', function(e) {
      let curDomIndex = 0
      curDomIndex = e.currentTarget.getAttribute('data-index')
      that.moveTo(curDomIndex, true)
    })
    LiDom.classList.add('indicator-li')
    ulDom.appendChild(LiDom)
  }
  ulDom.classList.add('indicator-ul')
  ulDom.style.marginTop = -that.pageEles.length * 15 + 'px'
  that.el.parentNode.appendChild(ulDom)
}

fullpage.selIndicator = function(sel_index) {
  let that = fullpage
  let indicator = that.el.parentNode.getElementsByClassName('indicator-ul')
  if (indicator && indicator[0]) {
    for (let i = 0; i < indicator[0].children.length; i++) {
      let element = indicator[0].children[i]
      if (i === Number(sel_index)) {
        element.classList.add('active')
      } else {
        element.classList.remove('active')
      }
    }
  }
}

fullpage.initEvent = function(el) {
  var that = fullpage
  that.prevIndex = that.curIndex
  el.addEventListener('touchstart', that.touchstart, { passive: true })
  el.addEventListener('touchend', that.touchend, { passive: true })
  if (that.o.preventWechat) {
    el.addEventListener('touchmove', function(e) {
      e.preventDefault()
    })
  }
}

fullpage.touchstart = function(e) {
  let that = fullpage
  if (that.o.movingFlag) {
    return false
  }
  that.startX = e.targetTouches[0].pageX
  that.startY = e.targetTouches[0].pageY
}
fullpage.touchend = function(e) {
  let that = fullpage
  if (that.o.movingFlag) {
    return false
  }
  var dir = that.o.dir
  var sub = dir === 'v' ? (e.changedTouches[0].pageY - that.startY) / that.height : (e.changedTouches[0].pageX - that.startX) / that.width
  var der = sub > that.o.der ? -1 : sub < -that.o.der ? 1 : 0
  // that.curIndex推迟到moveTo执行完之后再更新
  var nextIndex = that.curIndex + der

  if (nextIndex >= 0 && nextIndex < that.total) {
    that.moveTo(nextIndex, true)
  } else {
    if (that.o.loop) {
      nextIndex = nextIndex < 0 ? that.total - 1 : 0
      that.moveTo(nextIndex, true)
    } else {
      that.curIndex = nextIndex < 0 ? 0 : that.total - 1
    }
  }
}

fullpage.moveTo = function(curIndex, anim) {
  var that = fullpage
  var dist = that.o.dir === 'v' ? curIndex * -that.height : curIndex * -that.width
  that.o.movingFlag = true
  var flag = that.o.beforeChange(that.prevIndex, curIndex)
  if (flag === false) {
    // 重置movingFlag
    that.o.movingFlag = false
    return false
  }
  that.curIndex = curIndex

  if (anim) {
    that.el.classList.add('anim')
  } else {
    that.el.classList.remove('anim')
  }

  that.move(dist)
  if (that.o.needIndicator) {
    this.selIndicator(curIndex)
  }
  window.setTimeout(function() {
    that.o.afterChange(that.prevIndex, curIndex)
    that.o.movingFlag = false
    that.prevIndex = curIndex
    that.vm.$emit('toogle_animate', curIndex)
  }, that.o.duration)
}

fullpage.move = function(dist) {
  var xPx = '0px'
  var yPx = '0px'
  if (this.o.dir === 'v') {
    yPx = dist + 'px'
  } else {
    xPx = dist + 'px'
  }
  this.el.style.cssText += '-webkit-transform:translate3d(' + xPx + ', ' + yPx + ', 0px);transform:translate3d(' + xPx + ', ' + yPx + ', 0px);'
}

export default fullpage
