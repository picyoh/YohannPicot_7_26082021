
// hide dropdown if empty
function hideDropdown(){
    $('.dropdown').on('show.bs.dropdown',function(e) {
        if($('.dropdown-item').length == 0){
            $('.dropdown-menu').addClass('d-none');
        }else{
            $('.dropdown-menu').removeClass('d-none');
        }
    })
}

// focus on advance searches
function inputFocus(){
    $('.dropdown').on('shown.bs.dropdown', function(e) {
        e.target.children[0].children[0].focus();
    })
}

function changeArrow(){
    $('.dropdown').on('show.bs.dropdown', function(e) {
        e.target.children[0].children[3].className = "fas fa-angle-up";

    })

    $('.dropdown').on('hide.bs.dropdown', function(e) {
        e.target.children[0].children[3].className = "fas fa-angle-down";

    })
}