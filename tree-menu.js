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
			expandedItem:undefined,
			autoNumber:false,
			resetAutoNumberOnChildren:false,
			onLeafClick:undefined
		}
             
		var currentItemIndex = 1;	
			 
		$this.settings = {}
		
		var generateItem = function(menuItem, hasChildren, prefix){
			
			var menuHtml = "";
			var numberChildren=(menuItem.hasOwnProperty("items"))?menuItem.items.length:0;
			if (hasChildren){
				menuHtml = '<a href="#subitem'+menuItem.id+'" class="list-group-item" data-toggle="collapse" title="'+menuItem.title+'"> \
								<i class="fa fa-chevron-circle-down fa-2x pull-left"></i>\
								<h4 class="list-group-item-heading truncate">'+menuItem.name+'&nbsp;&nbsp;<span class="badge">'+numberChildren+'</span></h4> \
								'+((menuItem.description)?'<p class="list-group-item-text truncate">'+menuItem.description+'</p>':'')+' \
							</a>';
			}else{
				menuHtml = '<a href="#subitem'+menuItem.id+'" class="list-group-item leafItem" title="'+menuItem.title+'"> \
								<i class="fa fa-chevron-circle-right fa-2x pull-right"></i>\
								<h4 class="list-group-item-heading truncate">'+($this.settings.autoNumber?prefix+". ":"")+menuItem.name+'</h4> \
								'+((menuItem.description)?'<p class="list-group-item-text truncate">'+menuItem.description+'</p>':'')+' \
							</a>';
			}
			
			return menuHtml;
		}
		
		var generateSubitems = function(menuSubitems){
				
			var menuHtml = "";
			if ($this.settings.resetAutoNumberOnChildren){
				currentItemIndex=1;
			}
			$.each(menuSubitems, function( index, subItem ) {	
					menuHtml += generateItem(subItem,false,currentItemIndex);
					currentItemIndex++;
			});
			
			return menuHtml;
		}
		
		var init = function() {         
		
			$this.settings = $.extend({}, defaults, options);	
			
			var menu = $this.settings.menu;
			
			var menuHtml = "";
			
			$.each( menu, function( index, menuItem ) {
				if (menuItem.hasOwnProperty("items")){
						menuHtml += generateItem(menuItem,true,currentItemIndex);
						menuHtml += '<div class="collapse" id="subitem'+menuItem.id+'" style="margin-left:20px;">'+generateSubitems(menuItem["items"],currentItemIndex)+'</div>';
				}else{
						menuHtml += generateItem(menuItem,false,currentItemIndex);
						currentItemIndex++;
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
			
			if ($this.settings.expandedItem!=undefined){
				$($this.settings.expandedItem).collapse()
			}
				
		}
								
		init();
		
        return this;
 
    };
		
}( jQuery ));