import './vue-fullpage.scss'

class FullPage {
  // 配置
  public options: any = {
    start: 0, // 开始位置
    duration: 500, // 延时时间
    loop: false, // 重复播放
    dir: 'v', // 滚动方式
    der: 0.1, // 滚动激励
    movingFlag: false, // 是否为移动中
    preventWechat: false, // 禁止
    needIndicator: false, // 是否需要指示器
    beforeChange: function() {},
    afterChange: function() {}
  }
  // 当前页码
  public curIndex: number = 0
  // 总页码
  public total: number = 0
  public prevIndex: number = 0
  public startX = 0
  public startY = 0
  public width = 0
  public height = 0
  public vm: any
  // 当前绑定dom
  public el: any
  // 当前元素子元素集合
  public pageEles: any
  // 当前元素父元素
  public parentEle: any
  // 滚动计时器
  public scrollRunTime: any
  public WinOnresizeTime: any
  public install(Vue: any, options: any): void {
    let that = this
    window.onresize = () => {
      let width = document.documentElement.clientWidth
      if (this.WinOnresizeTime) {
        return
      }
      that.WinOnresizeTime = setTimeout(() => {
        if (width > 810) {
          that.init(that.el, that.options, '')
        } else {
          that.destroy()
        }
        that.WinOnresizeTime = null
      }, 500)
    }
    Vue.directive('fullpage', {
      inserted: function(el: any, binding: any, vnode: any) {
        let opts = binding.value || {}
        that.init(el, opts, vnode)
      },
      componentUpdated: function(el: any, binding: any, vnode: any) {
        var opts = binding.value || {}
        that.init(el, opts, vnode)
      }
    })
    Vue.directive('animate', {
      inserted: function(el: any, binding: any, vnode: any) {
        if (binding.value) {
          that.initAnimate(el, binding, vnode)
        }
      }
    })
  }
  public initAnimate(el: any, binding: any, vnode: any): void {
    let that = this
    let vm = vnode.context
    let aminate = binding.value
    el.style.opacity = '0'
    vm.$on('toogle_animate', function(curIndex: Number) {
      let curPage = +el.parentNode.getAttribute('data-id')
      if (curIndex === curPage) {
        that.addAnimated(el, aminate)
      } else {
        el.style.opacity = '0'
        that.removeAnimated(el, aminate)
      }
    })
  }
  public addAnimated(el: any, animate: any): void {
    let delay = animate.delay || 0
    el.classList.add('animated')
    window.setTimeout(function() {
      el.style.opacity = '1'
      el.classList.add(animate.value)
    }, delay)
  }
  public removeAnimated(el: any, animate: any): void {
    if (el.getAttribute('class').indexOf('animated') > -1) {
      el.classList.remove(animate.value)
    }
  }
  public initScrollDirection() {
    if (this.options.dir !== 'v') {
      this.el.classList.add('fullpage-wp-h')
    }
  }
  public scrollRun(e: any) {
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
    if (this.scrollRunTime) {
      return
    }
    let that = this
    this.scrollRunTime = setTimeout(() => {
      let nextIndex = that.curIndex + der
      if (nextIndex >= 0 && nextIndex < that.total) {
        that.moveTo(nextIndex, true)
      } else {
        if (that.options.loop) {
          nextIndex = nextIndex < 0 ? that.total - 1 : 0
          that.moveTo(nextIndex, true)
        } else {
          that.curIndex = nextIndex < 0 ? 0 : that.total - 1
        }
      }
      clearTimeout(that.scrollRunTime)
      that.scrollRunTime = null
    }, that.options.duration)
  }
  public destroy() {
    this.el.removeEventListener('mousewheel', this.scrollRun, { passive: true })
    for (var i = 0; i < this.pageEles.length; i++) {
      var pageEle = this.pageEles[i]
      pageEle.setAttribute('data-id', i)
      pageEle.style.width = ''
      pageEle.style.height = ''
      pageEle.removeEventListener('touchstart', this.touchstart, { passive: true })
      pageEle.removeEventListener('touchend', this.touchend, { passive: true })
    }
    if (this.el.parentNode.children[1]) {
      this.el.parentNode.removeChild(this.el.parentNode.children[1])
    }
  }
  public init(el: any, option: any, vnode: any) {
    this.options = Object.assign(this.options, option)
    if (vnode) {
      this.vm = vnode.context
      this.vm.$fullpage = this
    }
    this.curIndex = this.options.start

    this.startY = 0
    this.options.movingFlag = false

    this.el = el
    this.el.classList.add('fullpage-wp')

    this.parentEle = this.el.parentNode
    this.parentEle.classList.add('fullpage-container')

    this.pageEles = this.el.children
    this.total = this.pageEles.length

    this.initScrollDirection()

    if (document.addEventListener) {
      el.addEventListener('DOMMouseScroll', this.scrollRun, { passive: true })
    }
    el.addEventListener('mousewheel', this.scrollRun, { passive: true })
    let that = this
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
      if (that.options.needIndicator) {
        that.addIndicator()
      }
      that.moveTo(that.curIndex, false)
    }, 0)
  }
  public addIndicator() {
    let ulDom = document.createElement('ul')
    if (this.el.parentNode.children.length > 1) {
      return
    }
    let that = this
    for (let i = 0; i < this.pageEles.length; i++) {
      let LiDom = document.createElement('li')
      LiDom.setAttribute('data-index', i.toString())
      LiDom.addEventListener('click', function(e: any) {
        let curDomIndex = 0
        curDomIndex = e.currentTarget.getAttribute('data-index')
        that.moveTo(curDomIndex, true)
      })
      LiDom.classList.add('indicator-li')
      ulDom.appendChild(LiDom)
    }
    ulDom.classList.add('indicator-ul')
    ulDom.style.marginTop = -this.pageEles.length * 15 + 'px'
    this.el.parentNode.appendChild(ulDom)
  }
  public selIndicator(sel_index: number) {
    let indicator = this.el.parentNode.getElementsByClassName('indicator-ul')
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
  public initEvent(el: any) {
    this.prevIndex = this.curIndex
    el.addEventListener('touchstart', this.touchstart, { passive: true })
    el.addEventListener('touchend', this.touchend, { passive: true })
    if (this.options.preventWechat) {
      el.addEventListener('touchmove', function(e: any) {
        e.preventDefault()
      })
    }
  }
  public touchstart(e: any) {
    if (this.options.movingFlag) {
      return false
    }
    this.startX = e.targetTouches[0].pageX
    this.startY = e.targetTouches[0].pageY
  }
  public touchend(e: any) {
    if (this.options.movingFlag) {
      return false
    }
    let dir = this.options.dir
    let sub = dir === 'v' ? (e.changedTouches[0].pageY - this.startY) / this.height : (e.changedTouches[0].pageX - this.startX) / this.width
    let der = sub > this.options.der ? -1 : sub < -this.options.der ? 1 : 0
    // that.curIndex推迟到moveTo执行完之后再更新
    let nextIndex = this.curIndex + der

    if (nextIndex >= 0 && nextIndex < this.total) {
      this.moveTo(nextIndex, true)
    } else {
      if (this.options.loop) {
        nextIndex = nextIndex < 0 ? this.total - 1 : 0
        this.moveTo(nextIndex, true)
      } else {
        this.curIndex = nextIndex < 0 ? 0 : this.total - 1
      }
    }
  }
  public moveTo(curIndex: any, anim: any) {
    var dist = this.options.dir === 'v' ? curIndex * -this.height : curIndex * -this.width
    this.options.movingFlag = true
    var flag = this.options.beforeChange(this.prevIndex, curIndex)
    if (flag === false) {
      // 重置movingFlag
      this.options.movingFlag = false
      return false
    }
    this.curIndex = curIndex

    if (anim) {
      this.el.classList.add('anim')
    } else {
      this.el.classList.remove('anim')
    }

    this.move(dist)
    if (this.options.needIndicator) {
      this.selIndicator(curIndex)
    }
    let that = this
    window.setTimeout(function() {
      that.options.afterChange(that.prevIndex, curIndex)
      that.options.movingFlag = false
      that.prevIndex = curIndex
      that.vm.$emit('toogle_animate', curIndex)
    }, this.options.duration)
  }
  public move(dist: any) {
    var xPx = '0px'
    var yPx = '0px'
    if (this.options.dir === 'v') {
      yPx = dist + 'px'
    } else {
      xPx = dist + 'px'
    }
    this.el.style.cssText += '-webkit-transform:translate3d(' + xPx + ', ' + yPx + ', 0px);transform:translate3d(' + xPx + ', ' + yPx + ', 0px);'
  }
}
export default new FullPage()
