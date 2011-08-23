         $(function(){
                $.getJSON("http://js.developers.do/js/devdom.js?callback=?", function(json) {
                  var obj = jQuery.parseJSON(json);
                  alert(obj);
                  //$.getJSON("http://cubikox.com/iphoneapp/juanmboehme.json?callback=?", function(json) {
                  var items = [];
                  var links = [];
                   $.each(json.categorias, function(key, val) {
                      $('<div />',{'id':val.id,html:'<div class="toolbar"><h1>'+val.categoryName+'</h1><a class="back" href="#start">Home</a></div>'}).appendTo('#jqt');
                      items.push('<li class="arrow"><a class="cubeleft" href="#'+val.id+'"><img src="'+val.imageUrl+'">' + val.categoryName + '<br><span class="description">'+val.description+'</span></a><small class="counter">'+val.tutorials.length+'</small></li>');
                      $.each(val.tutorials, function(keys, vals){
                        $('<div />',{html:'<div class="toolbar"><h1>'+val.categoryName+'</h1><a class="back" href="#start">Home</a></div><ul id="'+val.id+''+vals.id+'"></ul>'}).appendTo('#jqt');
                        links.push('<li class="forward"><a href="'+vals.tutorialUrl+'" target="_blank">' + vals.name + '</a></li>');
                      });
                      $('<ul/>', {'class': "rounded",html: links.join('')}).appendTo('#'+val.id);
                       links=[];
                    });
                    
                    $('<ul/>', {
                        'class': "rounded",
                        html: items.join('')
                      }).appendTo('#start');
                 });
                $('a[target="_blank"]').click(function() {
                    if (confirm('Este link abrirá una ventana nueva.')) {
                        return true;
                    } else {
                        return false;
                    }
                });
                  // Obtiene los n tweets de un usuario y actualiza update_item
                  var getTweets = function(user, limit, update_item){
                    $.ajax({
                        url: "http://api.twitter.com/status/user_timeline/" + user + ".json?count=" + limit + "&callback=?",
                        dataType: 'json',
                        success:function(data){
                          var list = $('#' + update_item +' ul.tweets');
                          list.empty();
                          $(data).each(function(){
                            var img = $('<img>').attr({'src':this.user.profile_image_url,'class':'big'});
                            var divImg = $('<div>').css({float:'left', 'width':'75px'}).append(img);
                            var createdAt = $('<div>').addClass('created_at').text(this.created_at);
                            var userSpan = $('<span>').addClass('user').text(this.user.screen_name);
                            var p = $('<p>').addClass('small').text(this.text);
                            var divContent = $('<div>').css({marginLeft: '75px'})
                                                .append(createdAt)
                                                .append(userSpan)
                                                .append(p);
    
                              $('<li>')
                                .append(divImg)
                                .append(divContent)
                                .appendTo(list);
                          });
                        }
                     });
                  };
                  $('#theproc_es').bind('pageAnimationEnd', function(e, info){
                    getTweets('DevelopersDo', 20, 'theproc_es');
                  });
                });
