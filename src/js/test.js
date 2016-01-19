/* comments */
(function(w, $){
  if (w.document) {
    console.log('test');
  }
  if($) {
    console.log($('body').text());
  }
})(window, jQuery);
