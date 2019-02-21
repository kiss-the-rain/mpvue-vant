<template>
  <div class="ctl-product-card">
    <van-tag mark color="#F88460">{{tag}}</van-tag>
    <div class="upside">
      <img :src="thumb">
    </div>
    <div class="downside">
      <div class="title">{{title}}</div>
      <div class="description">{{desc}}</div>
      <div class="price">¥{{price}}</div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'productCard',
    components: {},
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {},
    watch: {},
    props: {
      title: String,
      desc: String,
      tag: String,
      price: Number,
      num: Number,
      thumb: String
    },
    mounted () {
    }
  }
</script>

<style>
  .ctl-product-card{
    background: #fff;
    height: 100%;
    margin: 5px;
    display: block;
    overflow: hidden;
    border-radius:10px;
  }
  .ctl-product-card .upside{
    width: 100%;
    height: 0px;
    padding-bottom: 100%;
    overflow: hidden;
    margin: 0;
    position: relative;
  }
  .ctl-product-card image{
    width: 100%;
  }
  .ctl-product-card .title,.ctl-product-card .description{
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    margin: 2px;
    text-indent: 5px;
  }
  .ctl-product-card .description{
  }
  .ctl-product-card .price{
    color: #F88460;
    text-indent: 5px;
  }
</style>
