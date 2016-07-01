// JavaScript Document
function share(data) {
    data.url = data.url === undefined ? window.location.href : data.url;
    data.message = data.message === undefined ? '' : data.message;
    switch (data.network) {
        case 'facebook':
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.url) + '&t=' + encodeURIComponent(data.message),'popup','width=640,height=500,scrollbars=no,resizable=yes,toolbar=no,directories=no,location=no,menubar=no,status=no,left=20%,top=20%');

            break;

        case 'twitter':
			window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(data.message) + '&url=' + encodeURIComponent(data.url),'popup','width=640,height=500,scrollbars=no,resizable=yes,toolbar=no,directories=no,location=no,menubar=no,status=no,left=20%,top=20%');
            /*
			$(data.self)
                .attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(data.message) + '&url=' + encodeURIComponent(data.url))
                .attr('onclick', '')
                .click()
            ;
			*/
            break;

        default:
    }
}