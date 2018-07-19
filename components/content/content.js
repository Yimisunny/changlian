// components/content/content.js
Component({
  properties: {
    content:{
      type:Object,
      value:{}
    },
    url:{
      type:String,
      value:""
    }
  },
  data: {

  },
  methods: {
    interlinkage:function(){
      wx.navigateTo({
        url: this.properties.url+ "?content=" + JSON.stringify(this.properties.content)
      })
    }
  }
})
