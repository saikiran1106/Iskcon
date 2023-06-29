// Donation Progressbar-
$(document).ready(function () {
    $('.isk_donation_cards_card').each(function () {
        var totalAmountText = $(this).find('.totalAmount').text();
        var totalAmount = parseAmount(totalAmountText);

        var amtDonatedText = $(this).find('.amtDonated').text().replace(/,/g, '');
        var parsedAmtDonated = parseAmount(amtDonatedText);

        var percentage = (parsedAmtDonated / totalAmount) * 100;
        setPercentage($(this).find('.progress-container'), percentage);
    });

    function parseAmount(amountText) {
        var parsedAmount = parseFloat(amountText.replace(/[^0-9.]/g, ''));
        if (amountText.includes('Lac')) {
            parsedAmount *= 100000;
        } else if (amountText.includes('Cr')) {
            parsedAmount *= 10000000;
        } else if (amountText.includes('K')) {
            parsedAmount *= 1000;
        } else if (amountText.includes('Rs')) {
            parsedAmount *= 1;
        }

        return parsedAmount;
    }

    function setPercentage(progressContainer, percentage) {
        var progressEl = progressContainer.find('.progress');
        var percentageEl = progressContainer.find('.percentage');

        progressEl.css('width', percentage + '%');
        percentageEl.text(percentage.toFixed(2) + '%');
        percentageEl.css('left', percentage + '%');
    }
});

// Modal
$(document).ready(function () {
    var buttons = $(".modalBtn");
    var spans = $(".close");

    buttons.click(function () {
        var modalId = $(this).data("modal"); // Get the data-modal attribute value
        var modal = $("#" + modalId); // Select the corresponding modal
        modal.css("display", "block");
    });

    spans.click(function () {
        var modal = $(this).closest(".modal");
        modal.css("display", "none");
    });

    $(window).click(function (event) {
        if (event.target.classList.contains("modal")) {
            var modal = $(event.target);
            modal.css("display", "none");
        }
    });
});

// Copy Link
$(document).ready(function () {
    $("#copyButton").click(function () {
        var copyInput = $("#copyInput");
        var copyButton = $(this);

        // Copy the input value to clipboard
        copyInput.select();
        document.execCommand("copy");

        // Change button text to "Copied!"
        $(this).text("Copied!");

        // Disable the button
        copyButton.prop("disabled", true);

        // Reset button text after 2 seconds
        setTimeout(function () {
            $("#copyButton").text("Copy");
            copyButton.prop("disabled", false);
        }, 2000);
    });
});

// Menu tabs-
// DESKTOP
$(document).ready(function () {
    $(".box_leftbar_tabs li").click(function () {
        $(".box_leftbar_tabs li").removeClass("activetab");
        $(this).addClass("activetab");
    });
})

// MOBILE
$(document).ready(function () {
    $(".mobLeftbar_tabs li").click(function () {
        $(".mobLeftbar_tabs li").removeClass("activetab");
        $(this).addClass("activetab");
    });
});

// Form
$(document).ready(function () {

    $('form').submit(function (event) {
        event.preventDefault();
        $('#addDetails').hide();
        $(this).trigger('reset');
        $('#submitBtn').prop('disabled', true);

        // Remove appended rows except the first one
        $('#detailsContainer .detail-row:not(:first)').remove();
        $('#detailsContainer .detail-divider').remove();
        // $('#detailsContainer').empty();
        validCheck();
    });


    // RESETTING FORM WHEN WE CLOSE MODAL
    $('form').closest('.modal-content').find('.close').click(function () {
        $('form').trigger('reset')
        $('#submitBtn').prop('disabled', true);

        // Remove appended rows except the first one
        $('#detailsContainer .detail-row:not(:first)').remove();
        $('#detailsContainer .detail-divider').remove();
    });


    // Number of Members
    $('.number-input .plus').click(function () {
        var value = parseInt($('#numMembers').val());
        $('#numMembers').val(value + 1);
        validCheck();
        addDetailRow();
        var container_1 = $(this).closest('#myForm').find("#detailsContainer");
        container_1.scrollTop(container_1[0].scrollHeight);

        // Reset radio buttons
        $('#repeatYes').prop('checked', false);
        $('#repeatNo').prop('checked', false);
        $('#prasadhYes').prop('checked', false);
        $('#prasadhNo').prop('checked', false);

        $(this).closest('form').find('#submitBtn').prop('disabled', true);
    });

    $('.number-input .minus').click(function () {
        var value = parseInt($('#numMembers').val());
        if (value > 1) {
            $('#numMembers').val(value - 1);
            removeDetailRow();
            validCheck();
        }
    });

    // Details of the person(s)
    $('#addDetails_btn').click(function () {
        $(this).closest('form').find('#submitBtn').prop('disabled', true);
        // console.log('runs');
        addDetailRow();
        var value = parseInt($('#numMembers').val());
        $('#numMembers').val(value + 1);
        var container = $(this).prev("#detailsContainer");
        container.scrollTop(container[0].scrollHeight);

        // Reset radio buttons
        $('#repeatYes').prop('checked', false);
        $('#repeatNo').prop('checked', false);
        $('#prasadhYes').prop('checked', false);
        $('#prasadhNo').prop('checked', false);
    });

    function addDetailRow() {
        var row =
            '<div class="detail-divider"></div>' +
            '<div class="detail-row">' +
            '<input type="text" name="details[]" placeholder="Name" />' + " " +
            '<input type="text" name="details[]" placeholder="Gothra" />' + " " +
            '<input style="width: 10.3156rem;" type="text" name="details[]" placeholder="Nakshatara" />' + " " +
            '<input type="text" name="details[]" placeholder="Rasi" />' + " " +
            '<input style="width: 12.2525rem;" type="text" name="details[]" placeholder="Date of Archana" />' + " " +
            '<input style="width: 12.2525rem;" type="text" name="details[]" placeholder="Preferred Timing" />' + " " +
            '</div>';

        $('#detailsContainer').append(row);
    }

    function removeDetailRow() {
        $('#detailsContainer .detail-row:last').remove();
        $('#detailsContainer .detail-divider:last').remove();
    }

    // Make Payment (enable/disable)
    function validCheck() {
        $('form input, form textarea').on('input', function () {
            var dateValue = $('#date').val();
            var numMembersValue = parseInt($('#numMembers').val());
            var isRepeatSelected = $('#repeatYes').is(':checked') || $('#repeatNo').is(':checked');
            var isPrasadhSelected = $('#prasadhYes').is(':checked') || $('#prasadhNo').is(':checked');
            var allDetailsFilled = true;

            // Check if any detail row input is empty
            $('.detail-row input').each(function () {
                if ($(this).val().trim() === '') {
                    allDetailsFilled = false;
                    return false; // exit the loop if any input is empty
                }
            });

            if (dateValue && numMembersValue > 0 && isRepeatSelected && isPrasadhSelected && allDetailsFilled) {
                $('#submitBtn').prop('disabled', false);

                // console.log('false');

            } else {
                $('#submitBtn').prop('disabled', true);
                // console.log('true');

            }
        });

        // console.log('runs');

    }
    validCheck();

    $('form input').on('change', function () {
        validCheck();
    });
});

// HAMBURGER
$(document).ready(function () {
    $('#menuToggle input').change(function () {
        if ($(this).is(':checked')) {
            $('#menu').css('transform', 'none');
            // $("body").css("overflow", "hidden");
        } else {
            $('#menu').css('transform', '');
            // $("body").css("overflow", "auto");
        }
    });
});

// EMBEDED IFRAME VIDIO STOP ON MODAL CLOSE
$(document).ready(function () {
    $('.modal-content .close').click(function () {
        var iframe = $(this).closest('.modal-content').find('iframe');
        iframe.attr('src', iframe.attr('src'));
    });

    $(window).click(function (event) {
        if (event.target.classList.contains("modal")) {
            var modal = $(event.target);
            var iframe = modal.find('.modal-content').find('iframe');
            iframe.attr('src', iframe.attr('src'));
        }
    });
});

// Function to send WhatsApp message
function sendWhatsAppMessage(title, amountDonated, impact) {
  // Construct the WhatsApp message
  var message = "Thank you for your donation!\n";
  message += "Donation Title: " + title + "\n";
  message += "Amount Donated: Rs. " + amountDonated + "\n";
  message += "Impact: " + impact;

  // Encode the message to be URL safe
  var encodedMessage = encodeURIComponent(message);

  // Create the WhatsApp link
  var whatsappURL = "https://wa.me/?text=" + encodedMessage;

  // Open the WhatsApp link in a new window or tab
  window.open(whatsappURL);
}

// Function to handle share button click for Anna Card
function handleAnnaShareClick() {
  var annaCard = document.querySelector('.Anna_Card');

  if (annaCard) {
    var amountDonatedElement = annaCard.querySelector('.amtDonated');
    var impactElement = annaCard.querySelector('.isk_donation_cards_card_amount p:nth-child(2) span');
    var titleElement = annaCard.querySelector('.isk_donation_cards_card_title');

    if (amountDonatedElement && impactElement && titleElement) {
      var amountDonated = amountDonatedElement.textContent;
      var impact = impactElement.textContent;
      var title = titleElement.textContent;

      sendWhatsAppMessage(title, amountDonated, impact);
    } else {
      console.error('Required elements not found in Anna Card.');
    }
  } else {
    console.error('Anna Card not found.');
  }
}

// Function to handle share button click for Temple Card
function handleTempleShareClick() {
  var templeCard = document.querySelector('.temple_card');

  if (templeCard) {
    var amountDonatedElement = templeCard.querySelector('.amtDonated');
    var impactElement = templeCard.querySelector('.isk_donation_cards_card_amount p:nth-child(2) span');
    var titleElement = templeCard.querySelector('.isk_donation_cards_card_title');

    if (amountDonatedElement && impactElement && titleElement) {
      var amountDonated = amountDonatedElement.textContent;
      var impact = impactElement.textContent;
      var title = titleElement.textContent;

      sendWhatsAppMessage(title, amountDonated, impact);
    } else {
      console.error('Required elements not found in Temple Card.');
    }
  } else {
    console.error('Temple Card not found.');
  }
}

// Function to handle share button click for Goshala Card
function handleGoshalaShareClick() {
  var goshalaCard = document.querySelector('.goshala_card');

  if (goshalaCard) {
    var amountDonatedElement = goshalaCard.querySelector('.amtDonated');
    var impactElement = goshalaCard.querySelector('.isk_donation_cards_card_amount p:nth-child(2) span');
    var titleElement = goshalaCard.querySelector('.isk_donation_cards_card_title');

    if (amountDonatedElement && impactElement && titleElement) {
      var amountDonated = amountDonatedElement.textContent;
      var impact = impactElement.textContent;
      var title = titleElement.textContent;

      sendWhatsAppMessage(title, amountDonated, impact);
    } else {
      console.error('Required elements not found in Goshala Card.');
    }
  } else {
    console.error('Goshala Card not found.');
  }
}

// Add event listeners to share buttons
// Add event listeners to share buttons
var annaShareButton = document.querySelector('.share_anna');
var templeShareButton = document.querySelector('.share_temple');
var goshalaShareButton = document.querySelector('.share_goshala');
var whatsappShareButton1 = document.getElementById('whatsapp_share_anna');
var whatsappShareButton2 = document.querySelector('.whatsapp_share_temple');
var whatsappShareButton3 = document.querySelector('.whatsapp_share_goshala');

  annaShareButton.addEventListener('click', function() {

    console.log('clicked');

    whatsappShareButton1.style.display = 'inline-block';
    whatsappShareButton2.style.display = 'none';
    whatsappShareButton3.style.display = 'none';
  });



  templeShareButton.addEventListener('click', function() {
   
     whatsappShareButton1.style.display = 'none';
    whatsappShareButton2.style.display = 'inline-block';
    whatsappShareButton3.style.display = 'none';
  });



  goshalaShareButton.addEventListener('click', function() {
    whatsappShareButton3.style.display = 'inline-block';
      whatsappShareButton1.style.display = 'none';
    whatsappShareButton2.style.display = 'none';
    
  });








  // Send a POST request to the click counter API endpoint
 function incrementClickCount() {
    
  console.log('clicked');
  fetch('http://localhost:3000/Temple_Creation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000' // Replace with your frontend URL
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function incrementClickCount1() {
  console.log('clicked');
  fetch('http://localhost:3000/donate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000' // Replace with your frontend URL
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function incrementClickCount2() {
  console.log('clicked');
  fetch('http://localhost:3000/live', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000' // Replace with your frontend URL
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

const clickCounterDiv = document.getElementById('clickCounter');
const donate = document.getElementById('donate');
const live = document.getElementById('live');

donate.addEventListener('click', 
function(event){
event.preventDefault();
incrementClickCount1();
}
);
live.addEventListener('click', incrementClickCount2);
clickCounterDiv.addEventListener('click', incrementClickCount);



const submitForm = async () => {
  const form = document.getElementById('myForm');
  const formData = new FormData(form);
  

  // Retrieve the details input fields and convert them to an array of objects
  const detailsInputs = Array.from(document.querySelectorAll('.detail-row'));
  const details = detailsInputs.map((detailInput) => {
    const inputs = detailInput.querySelectorAll('input');
    return {
      name: inputs[0].value,
      gothra: inputs[1].value,
      nakshatara: inputs[2].value,
      rasi: inputs[3].value,
      dateOfArchana: inputs[4].value,
      preferredTiming: inputs[5].value
    };
  });

  // Assign the details array to the form data
  formData.append('details', JSON.stringify(details));

  // Submit the form data to the server
  try {
    const response = await fetch('http://localhost:4000/api/submit-form', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
// Add event listener to the submit button
const submitButton = document.getElementById('submitBtn');
submitButton.addEventListener('click', submitForm);




document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;

    // Create an object with form data
    const formData = {
      date: form.date.value,
      numMembers: form.numMembers.value,
      details: [],
      repeat: form.repeat.value,
      prasadh: form.prasadh.value
    };

    // Collect details input values
    const detailRows = form.querySelectorAll('.detail-row');
    detailRows.forEach(function(row) {
      const inputs = row.querySelectorAll('input');
      const detailData = Array.from(inputs).map(function(input) {
        return input.value;
      });
      formData.details.push(detailData);
    });

    // Send the form data to the API endpoint
    fetch('http://localhost:4000/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,
              'Access-Control-Allow-Origin': 'http://localhost:4000'
      },
      body: JSON.stringify(formData)
    })
      .then(function(response) {
        if (response.ok) {
          // Handle successful form submission
          alert('Form submitted successfully');
          form.reset();
        } else {
          // Handle error response
          alert('Error submitting form');
        }
      })
      .catch(function(error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert('Error submitting form');
      });
  });








