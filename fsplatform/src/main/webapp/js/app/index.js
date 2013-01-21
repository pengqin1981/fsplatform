$().ready(function() {
	// user profile
    $('#user').text($.FSP.config.username);
    
    // logout
    $('#logout').click(function() {
        $.FSP.unauthenciate();
        window.location.href = './login.html';
    });
});