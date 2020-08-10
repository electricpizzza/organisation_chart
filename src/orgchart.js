/* OrgChart.js 0.8
Author Lee Owens 
https://owens2024.github.io/bootstrap-orgchart/ 
*/
var OrgTree = (function() {
    var publicAPI = {};
    this.bootstrapGridBase = 12;
    
    this.options = {
        baseClass: 'org-tree',
        baseLevel: this.bootstrapGridBase,
        minWidth: 2,
        collapsable: true,
        renderNode: function(node){
            const modalId = node.name.replace(' ','_');
            return `<div class="node center-block d-flex justify-content-center flex-column">
                        <div data-toggle="modal" data-target="#${modalId}">
                        <h5 class=" text-center text-capitalize">${node.name}</h5>
                        <p class=" text-center text-capitalize">${node.label}</p>  
                        </div>
                          <div class="modal fade" id="${modalId}" role="dialog">
                          <div class="modal-dialog p-3">
        
                          <!-- Modal content-->
                          <div class="modal-content">
                            <div class="modal-header border-0">
                              <div class="container-fluid row col-12">
                                <div class="col-3 rounded-circle">
                                  <img class="rounded-circle w-100 h-75" src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/profile-icon.png" alt="profile image" srcset="">
                                </div>
                                <div class="col-9 d-flex justify-content-end flex-column">
                                  <h5 class="text-capitalize text-info text-bold">${node.label}</h5>
                                  <b>${node.name}</b>
                                  <b>num tel</b>
                                </div>
                              </div>
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                
                            </div>
                            <div class="modal-body">
                              <p> - Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis consequuntur reprehenderit earum vitae quibusdam laboriosam tenetur perspiciatis nulla fugiat nesciunt iste odio nostrum, nam, beatae esse obcaecati soluta quos amet?.</p>
                              <p> - Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis consequuntur reprehenderit earum vitae quibusdam laboriosam tenetur perspiciatis nulla fugiat nesciunt iste odio nostrum, nam, beatae esse obcaecati soluta quos amet?.</p>
                            </div>
                
                          </div>
                          

                           </div>
                         </div>
                         ${this.renderCollapseIcon(node)}
                    </div>`;
        },
        renderCollapseIcon: function(node){
            if(this.collapsable && node.children && node.children.length > 0) {
                return `
                <a class="collapse_node d-flex justify-content-center">
                    <img src="https://img.icons8.com/android/24/000000/expand-arrow.png"/>
                </a>`;
            } else {
                return '';
            }
        },

    };

    publicAPI.setOptions = function(options) {
        $.extend(this.options, options);
    }.bind(this);

    publicAPI.makeOrgTree = function($elem, data) {
        var base = $('<div class="' + this.options.baseClass + '">');
        var row = $('<div class="row">');
        var level = this.options.baseLevel;
        var width = this.bootstrapGridBase;

        data.forEach(function(node) {
            row.append(getNode(node, width, true, level, 100));
        });
        base.append(row);
        $elem.append(base);
        bindCollapse();
    }.bind(this);
    
    function bindCollapse(){
        if(this.options.collapsable) {
            $(document).on('click.orgchart.collapse', '.collapse_node', $.proxy(function(ev){
                $(ev.target).parents(".item:first").find(".row").toggle();
                $(ev.target).parents(".parent").toggleClass("collapsed");
                this.options.toggleCollapseIcon(ev.target);
            }, this));
        }
    }

    function getNode(node, level, noParent, baseCol, width) {
        var sublevel,
            self = $('<div class="item col-lg"  data-width="' + width + '">');
        if(width > 30) {
            self = $('<div class="item col"  data-width="' + width + '">');
            
        }

        if (node.children) {

            var childRow = $('<div class="row">');
            baseCol = Math.floor(baseCol / node.children.length);
            if(baseCol == 0) baseCol = 1;
            self.addClass('child-width-'+baseCol);
            self.append(makeNode(node, true, !noParent));
            if (baseCol < this.options.minWidth) {
            
                sublevel = this.bootstrapGridBase;
            }
            else {
                sublevel = Math.floor(this.bootstrapGridBase / node.children.length);
                if (sublevel == 0) {
                    sublevel = 1;
                }
            }
            var childWidth = Math.floor(width / node.children.length);
            node.children.forEach(function(node) {
                childRow.append(getNode(node, sublevel, false, baseCol, childWidth));
            });
            self.append(childRow);
        }
        else {
            self.append(makeNode(node, false, !noParent));
        }
        return self;
    }

    function makeNode(node, isParent, isChild) {

        var container;
        var mainItem = $(this.options.renderNode(node));

        if (isParent) {
            container = $(`<div class="parent d-flex">`);
            mainItem = container.append(mainItem);
        }
        container = $('<div class="child d-flex justify-content-center">');
        if (!isChild) {
            container.addClass('root');
        }
        container.append(mainItem);
        mainItem = container.append(mainItem);
        return mainItem;
    }

    return publicAPI;
})();

