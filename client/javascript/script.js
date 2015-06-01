var api = "http://sdcodestatus.azurewebsites.net/api/"

function showResults(id){
  $.ajax({
    url: api+"getViolationById?violationId="+ id,
    type: 'GET',
    success: function (data) {
      $('.resultItem').remove();
      console.log(data);
      $('#code-id').val('');      
      $('.display').toggle();
      if(Array.isArray(data)){
        console.log('response is an array')
        for(var i = 0; i < data.length; i++){
          $('.results').append(
            "<p><input class='resultItem' type='checkbox' id=" + "'" + i + 1 + "'/>" + 
            "<label for='" + i + 1 + "'>" + 
            "Case ID: " + data[i].CaseId + 
            "Case Description: " + data[i].Description + 
            "Case lastAction: " + data[i].LastAction + 
            "Case LastActionUpdatedate: " + data[i].LastActionUpdatedate +
            "</label></p>"
            )
        }        
      } else {
        console.log('response is an object');
        $('.results').prepend(
          "<p><input class='resultItem' type='checkbox' id='1' data-case='" + data.CaseId + "' " + "id=" + "'" + 1 + "'/>" + "<label for='" + 1 + "'>" + 
          "CaseID: "+ data.CaseId + 
          "<br/>Case Description: " + data.Description + 
          "<br/>Last Action: " + data.LastAction + 
          "<br/>Case LastActionUpdatedate: " + data.LastActionUpdatedate + 
          "</label></p>"
          )
      }
    },
    error: function(error){
      $('.container').prepend('<div class="warning">An Error Occured Please Try Again</div>')
      window.setTimeout(function(){
        $('.warning').toggle();
      }, 5000)
    }
  });
}

$('#id-form').submit(function(e){
  e.preventDefault();
  var value = $('#code-id').val();
  console.log(value);
  showResults(value);
})

$('.results').submit(function(e){
  e.preventDefault();
  $('input:checked').each(function(){
    console.log(this);
  })
  subscribe();
})

function subscribe(){
  data = {};
  data.emailAddress = $('#email').val();
  data.sendEmail = true;
  data.sendSMS = 
  data.CurrentStatus = $('input:checked').data('currentstatus');
  data.violationId = $('input:checked').data('case');
  console.log('data being registered', data);

  $.ajax({
    url: api + '/subscribe?' + $.param(data),
    type: 'POST',
    success: function(data){
      console.log('successfully registered ', data)
    },
    error: function(error){
      // redirect to an error page
      console.log('oh oh, an error Occured ', error)
    }
  })
}