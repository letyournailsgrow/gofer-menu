(function ( $ ) {
	
    $.fn.treeMenu = function(  options ) {
       
	    var $this = this;
	    
		/* 
		    exemple: 
			
			options.menu:
			[
				{
					id:1,
					name:"Report 1",
					description:"descriere raport 1",
					title:"descriere raport 1",
					link:"#"
				},
				{
					id:2,
					name:"Report 2",
					description:"descriere raport 2",
					title:"descriere raport 2",
					link:"#",
					items:[
							{
								id:3,
								name:"Subitem 2.1",
								description:"descriere raport 2.1",
								title:"descriere subraport 2.1",
								link:"#"
							},
							{
								id:4,
								name:"Subitem 2.2",
								description:"descriere raport 2.2",
								title:"descriere subraport 2.2",
								link:"#"
							},
							{
								id:5,
								name:"Subitem 2.3",
								description:"descriere raport 2.3",
								title:"descriere subraport 2.3",
								link:"#"
							},
					]
				}
			]		
			
		 */
		 
		var defaults = {
			menu:{},
			onLeafClick:undefined
		}
                
		$this.settings = {}
		
		var generateItem = function(menuItem, hasChildren){
			
			var menuHtml = "";
			
			if (hasChildren){
				menuHtml = '<a href="#subitem'+menuItem.id+'" class="list-group-item" data-toggle="collapse" title="'+menuItem.title+'"> \
								<i class="fa fa-chevron-circle-down fa-2x pull-left"></i>\
								<h4 class="list-group-item-heading truncate">'+menuItem.name+'</h4> \
								'+((menuItem.description)?'<p class="list-group-item-text truncate">'+menuItem.description+'</p>':'')+' \
							</a>';
			}else{
				menuHtml = '<a href="#subitem'+menuItem.id+'" class="list-group-item leafItem" title="'+menuItem.title+'"> \
								<i class="fa fa-chevron-circle-right fa-2x pull-right"></i>\
								<h4 class="list-group-item-heading truncate">'+menuItem.name+'</h4> \
								'+((menuItem.description)?'<p class="list-group-item-text truncate">'+menuItem.description+'</p>':'')+' \
							</a>';
			}
			
			return menuHtml;
		}
		
		var generateSubitems = function(menuSubitems){
				
			var menuHtml = "";
			
			$.each(menuSubitems, function( index, subItem ) {	
					menuHtml += generateItem(subItem,false);
			});
			
			return menuHtml;
		}
		
		var init = function() {         
		
			$this.settings = $.extend({}, defaults, options);	
			
			var menu = $this.settings.menu;
			
			var menuHtml = "";
				
			$.each( menu, function( index, menuItem ) {
				if (menuItem.hasOwnProperty("items")){
						menuHtml += generateItem(menuItem,true);
						menuHtml += '<div class="collapse" id="subitem'+menuItem.id+'" style="margin-left:20px;">'+generateSubitems(menuItem["items"])+'</div>';
				}else{
						menuHtml += generateItem(menuItem,false);
				}				
							
			});
			
		
			$container = $(document.createElement("span")).html("<div class='list-group panel'>"+menuHtml+"</div>");	
				
			$this.html( $container );

			$this.find("[data-toggle='collapse']").click(function(e) {
				var $this = $(this);
				var $icon = $this.find("i");
				            
				if ($icon.hasClass('fa-chevron-circle-down')) {
					$icon.removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
				} else {
					$icon.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
				}
			});	
			
			$this.find(".leafItem").click(function(e){
				if ($this.settings.onLeafClick!=undefined){
					$this.settings.onLeafClick(this.hash);	
				}
			});
				
		}
								
		init();
		
        return this;
 
    };
		
}( jQuery ));