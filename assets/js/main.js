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



function sendWhatsAppMessage() {
  // Get the current web link
  var currentURL = window.location.href;

  // Construct the WhatsApp message
  var message = "Check out this link: " + currentURL;

  // Encode the message to be URL safe
  var encodedMessage = encodeURIComponent(message);

  // Create the WhatsApp link
  var whatsappURL = "https://wa.me/?text=" + encodedMessage;

  // Open the WhatsApp link in a new window or tab
  window.open(whatsappURL);
}








