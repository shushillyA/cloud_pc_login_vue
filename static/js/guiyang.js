(function(href,location) {
  if(/guiyang\./.test(href)) {
    $('.content>h1')[0].className += ' guiyang'
    document.cookie="region="+location;
    var guiyang = '贵阳市教育局&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="company" href="http://www.xlhbly.com/" target="_blank">上海心灵伙伴览育信息技术有限公司</a>&nbsp;&nbsp;'
    $('.copyright').html(guiyang)
  } else {
    var html = '© 2014-2017&nbsp;&nbsp;' + 
    '<a class="company" href="http://www.xlhbly.com/" target="_blank">上海心灵伙伴览育信息技术有限公司</a>&nbsp;&nbsp;' +
    '<a href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备13015608号-2&nbsp;&nbsp; </a>' + 
    '<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702001225" target="_blank">沪公网安备 31010702001225号</a>'
    $('.copyright').html(html)
  }
})(window.location.href,'guiyang')
// })('guiyang.', 'guiyang')