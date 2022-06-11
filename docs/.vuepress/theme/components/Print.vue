<template>
  <div class="print-picker">
		<a class="color-button" title="打印" @click.prevent="printDoc">
      <reco-icon icon="reco-other" />
		</a>
	</div>
</template>

<script>
import { RecoIcon } from '@vuepress-reco/core/lib/components'
export default {
  name: 'Print',
  components: {
    RecoIcon,
  },
  methods: {
    printDoc () {
      const excludeArr = ['#exclude-print-navbar', '#exclude-print-sidebar', '#exclude-print-sub-sidebar', '#goTop', '.kanbanniang', '.page-edit', '.page-nav', 'img']
      excludeArr.forEach(item => {
        const targetDOM = document.querySelector(item) || ''
        if (targetDOM) {
          const parentDOM = targetDOM.parentElement
          parentDOM.removeChild(targetDOM)
        }
      })
      if (document.querySelector('.page')) {
        document.querySelector('.page').style.backgroundColor = '#fff'
      }
      window.print()
      window.location.reload()
    }
  }
}
</script>

<style lang="stylus">
.print-picker {
	position: relative;
	margin-right: 1em;
  cursor pointer;
	.color-button {
		align-items: center;
		height: 100%;
		.iconfont {
			font-size 1.2rem
			color: #894e54
		}
	}
}
</style>