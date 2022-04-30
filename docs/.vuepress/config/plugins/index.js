module.exports = [
  '@vuepress-reco/extract-code', // 代码组合插件
  [ // 动态标题插件
    'dynamic-title',
    {
      showIcon: '/favicon.ico',
      showText: '(/≧▽≦/)咦！又好了！',
      hideIcon: '/failure.ico',
      hideText: '(●—●)喔哟，崩溃啦！',
      recoverTime: 2000,
    },
  ],
  [ // 看板娘插件
    '@vuepress-reco/vuepress-plugin-kan-ban-niang',
    {
      // theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
      theme: ['haru1'],
      clean: true, // 是否隐藏所有按钮
      messages: {
        welcome: '欢迎来到',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '你知道我喜欢吃什么吗？痴痴地望着你。'
      },
      messageStyle: {
        right: '68px',
        bottom: '190px'
      },
      modelStyle: {
        right: '120px',
        bottom: '-20px',
        opacity: '0.9'
      },
      btnStyle: {
        right: '90px',
        bottom: '40px',
      },
      width: 150,
      height: 220
    }
  ],
  [ // 点击特效插件
    'cursor-effects',
    {
      size: 2, // 特效大小, 默认2
      shape: 'star', // 点击特效形状, 'star' | 'circle'
      zIndex: 999999999, // z-index层级, 默认999999999
    },
  ],
  // ['@vuepress-reco/vuepress-plugin-bulletin-popover', { // 公告弹窗插件
  //   width: '210px', // 默认 260px, 大小会影响看板娘
  //   title: '咳咳🙈',
  //   body: [
  //     {
  //       type: 'title',
  //       content: '有没有一种可能，你会请我喝杯奶茶🙊🙊🙊',
  //       style: 'text-aligin: center;'
  //     },
  //     {
  //       type: 'image',
  //       src: '/assets/qq_pay.png'
  //     }
  //   ],
  //   footer: [
  //     {
  //       type: 'button',
  //       text: '打赏',
  //       link: '/donate'
  //     }
  //   ]
  // }],
  ["sakura", { // 樱花插件
    num: 20,  // 默认数量
    show: true, //  是否显示
    zIndex: -1,   // 层级
    img: {
      replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
      httpUrl: '...'     // 绝对路径
    }
  }],
  ["vuepress-plugin-nuggets-style-copy", { // 复制弹窗插件
    copyText: "复制",
    tip: {
        content: "复制成功!"
    }
  }],
  ['go-top'], // 悬挂喵插件
]