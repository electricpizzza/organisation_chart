$(function () {
    setTimeout(() => {

        const parent = $(".org-tree .parent");
        for (let index = 0; index < parent.length; index++) {
            const element = parent[index];
            const childe = $(element).closest(".item .col .child-width-1"); 
            if (childe.length>0) {
              console.log(element);

                $(element).css({
                    "translateY": "-10px"
                    
                });
            }
        }
    }, 1000);
});