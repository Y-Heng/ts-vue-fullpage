// var fullpage = {}
// let opt: any = {
//   start: 0,
//   duration: 500,
//   loop: false,
//   dir: 'v',
//   der: 0.1,
//   movingFlag: false,
//   preventWechat: false,
//   beforeChange: function() {},
//   afterChange: function() {}
// }

// class FullPage {
//   public options: any = {}
//   public vm: any = {}
//   public curIndex: Number = 0
//   public inserted(el: any, binding: any, vnode: any) {
//     var opts = binding.value || {}
//     that.init(el, opts, vnode)
//   }
//   public componentUpdated(el: any, binding: any, vnode: any) {}

//   /// 添加参数值
//   private assignOpts(option: any) {
//     this.options = option || {}
//     for (let key in opt) {
//       if (!this.options.hasOwnProperty(key)) {
//         this.options[key] = opt[key]
//       }
//     }
//   }
//   private initScrollDirection() {
//     if (this.options.dir !== 'v') {
//       this.el.classList.add('fullpage-wp-h')
//     }
//   }
//   private init(el: any, options: any, vnode: any) {
//     this.assignOpts(options)

//     this.vm = vnode.context
//     this.curIndex = this.options.start

//     that.startY = 0
//     that.o.movingFlag = false

//     that.el = el
//     that.el.classList.add('fullpage-wp')

//     that.parentEle = that.el.parentNode
//     that.parentEle.classList.add('fullpage-container')

//     that.pageEles = that.el.children
//     that.total = that.pageEles.length

//     that.initScrollDirection()
//     window.setTimeout(function() {
//       that.width = that.parentEle.offsetWidth
//       that.height = that.parentEle.offsetHeight

//       for (var i = 0; i < that.pageEles.length; i++) {
//         var pageEle = that.pageEles[i]
//         pageEle.setAttribute('data-id', i)
//         pageEle.classList.add('page')
//         pageEle.style.width = that.width + 'px'
//         pageEle.style.height = that.height + 'px'
//         that.initEvent(pageEle)
//       }
//       that.moveTo(that.curIndex, false)
//     }, 0)
//   }
// }

// class Animate {
//   public inserted(el: any, binding: any, vnode: any) {
//     if (binding.value) {
//       this.initAnimate(el, binding, vnode)
//     }
//   }
//   private initAnimate(el: any, binding: any, vnode: any) {
//     var vm = vnode.context
//     var aminate = binding.value
//     el.style.opacity = '0'
//     let that = this
//     vm.$on('toogle_animate', function(curIndex: any) {
//       var curPage = +el.parentNode.getAttribute('data-id')
//       if (curIndex === curPage) {
//         that.addAnimated(el, aminate)
//       } else {
//         el.style.opacity = '0'
//         that.removeAnimated(el, aminate)
//       }
//     })
//   }
//   private addAnimated(el: any, animate: any) {
//     var delay = animate.delay || 0
//     el.classList.add('animated')
//     window.setTimeout(function() {
//       el.style.opacity = '1'
//       el.classList.add(animate.value)
//     }, delay)
//   }

//   private removeAnimated(el: any, animate: any) {
//     if (el.getAttribute('class').indexOf('animated') > -1) {
//       el.classList.remove(animate.value)
//     }
//   }
// }
