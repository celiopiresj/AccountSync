$(document).ready(function() {

  const formInput = $('#password').parent();
  const visibility = icons('visibility','outlined','visibility','visibility');
  const visibility_off = icons('visibility_off','outlined','visibility','visibility_off');

  visibility.done(svgElement => {
    svgElement.css('display', 'none');
    formInput.append(svgElement);
  });

  visibility_off.done(svgElement => {
    svgElement.css('display', 'none');
    formInput.append(svgElement);
  });

 
  let sendForm = false;

  $('#username, #password').on('input', function() {
    let valorInput1 = $('#username').val();
    let valorInput2 = $('#password').val();

    if (valorInput1 !== '' && valorInput2 !== '') {
      $('#loginButton').removeClass('disabled');
      $('#loginButton').addClass('active');
      sendForm = true;
    } else {
      $('#loginButton').removeClass('active');
      $('#loginButton').addClass('disabled');
      sendForm = false;
    }

  });

$('#loginButton').on('click', (event) => {
    event.preventDefault(); 

    if(!sendForm){
      return
    }
  
    const email = $('#username').val();
    const password = $('#password').val();

    const loginData = { email, password };
  
    $.ajax({
      url: '/login',
      method: 'POST',
      data: JSON.stringify(loginData),
      contentType: 'application/json',
      success: function(response) {

        if (response.error.code !== 200){
         return console.log(response.error) 

        }
          
        const {api_key, client_id, email, name, passwordHash} = response
        
        const discovery_doc = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
        const scopes = 'https://www.googleapis.com/auth/drive.metadata.readonly';
        gapi.load('client', initializeGapiClient);
        
        async function initializeGapiClient() {
          await gapi.client.init({
            apiKey: api_key,
            discoveryDocs: [discovery_doc],
          });
  
          tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: client_id,
            scope: scopes,
            callback: '',
          });
          AuthClient()
        }

        function AuthClient() {
          tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
              throw (resp);
            }
            await listFiles();
          };
  
          if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({prompt: 'consent'});
          } else {
            tokenClient.requestAccessToken({prompt: ''});
          }
        }

        async function listFiles() {
          let response;
          try {
            response = await gapi.client.drive.files.list({
              'pageSize': 10,
              'fields': 'files(id, name)',
            });
          } catch (err) {
            console.log(err.message);
            return;
          }
          const files = response.result.files;
          if (!files || files.length == 0) {
            console.log('No files found.');
            return;
          }
          // Flatten to string to display
          const output = files.reduce(
              (str, file) => `${str}${file.name} (${file.id})\n`,
              'Files:\n');
          console.log(output);
        }

      },
      error: function(error) {

        console.error('Erro ao enviar os dados de login:', error);
      }
    });
  });

  $('#password').focus(function() {
    if ($('#visibility').is(":hidden") && $('#visibility_off').is(":hidden")) {
      $('#visibility').show();
    }
  });

  $('#password').blur(function() {
    if ($(this).val().length === 0) {
      $('#visibility').hide();
      $('#visibility_off').hide()
    }
  });

  $('.login__form-input').focus(function(){
    if ($(this).attr('id') == 'password'){
      $('#visibility').addClass('filled')
      $('#visibility_off').addClass('filled')
    }
  })

  $('.login__form-input').blur(function() {
    
    const inputValue = $(this).val();
    const formGroup = $(this).closest('.login__form-group-input');
    const formLabel = formGroup.find('.login__form-label');
    
    if (inputValue.trim() !== '') {
      formLabel.addClass('filled');
      if ($(this).attr('id') == 'password'){
        $('#visibility').removeClass('filled');
        $('#visibility_off').removeClass('filled');
      }
    } else {
      formLabel.removeClass('filled');
      if ($(this).attr('id') == 'password'){
        $('#visibility').removeClass('filled');
        $('#visibility_off').removeClass('filled');
      }
    }
  });

    setTimeout(function() {
      $('#loading').fadeOut();
    }, 6000);

});

$(document).on('click', '.visibility', function() {

  if($(this).attr('id') == "visibility"){
    $('#visibility').hide();
    $('#visibility_off').show()
    $("#password").attr('type',"text");
  }
  else {
    $('#visibility').show();
    $('#visibility_off').hide()
    $("#password").attr('type',"password");
  };
});