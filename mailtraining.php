<?php
//TRAINING Email


// Check for empty fields
if(empty($_POST['email'])     ||
   empty($_POST['tel'])     ||
   empty($_POST['naam'])     ||
   empty($_POST['kvk'])     ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['tel']));
$email_jim = 'jimdamen@balance.nl';

$naam_persoon = $_POST['naam'];
$email_ingevuld = $_POST['email']; // required
$telefoon = $_POST['tel'];
$naam_bedrijf = $_POST['bedrijfsnaam'];
$kvk_nummer = $_POST['kvk'];

// Create the email and send the message
$to = $email_address ;// Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "SDE+ training";
$email_body = "<p>Beste $naam_persoon, </p>\n\n"."<p>Gefeliciteerd met uw aanmelding voor onze SDE+ training op 11 maart aanstaande. U heeft een goede keuze gemaakt. In deze training leren wij u namelijk alles wat u nodig heeft om succesvol SDE+ subsidie aan te vragen. </p> \n\n ". "<p>Houd uw mailbox in de gaten, want wij sturen u binnenkort nog uitgebreidere informatie op over uw SDE+ training, inclusief voorbereidende documenten.</p> \n\n". "<p>Met vriendelijke groeten, </p>\n\n". "<p>Jim Damen </p>\n\n". "<p>jimdamen@balance.nl </p>\n\n". "<p>+31 639190647</p>".
$headers = "From: info@sdetool.nl\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_jim";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";


mail($to,$email_subject,$email_body,$headers);


$to2 = 'cornevanstraten@balance.nl';
$email_subject2 = "SDE TRAINING aanmelding";
$email_body2 = "Je hebt een nieuwe aanmelding via SDEtool\n\n"."Hier is de contactinformatie:\n\n Naam: $naam_persoon\n\nEmail: $email_ingevuld\n\nTelefoon: $telefoon\n\nBedrijfsnaam:  $naam_bedrijf\n\nKVK: $kvk_nummer\n";
$headers2 = "From: info@sdetool.nl\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers2 .= "Reply-To: $email_jim";


mail($to2,$email_subject2,$email_body2,$headers2);


$to3 = 'jimdamen@balance.nl';

mail($to3,$email_subject2,$email_body2,$headers2);

$to4 = 'subsidies@balance.nl';

mail($to4,$email_subject2,$email_body2,$headers2);

// echo "\nThis works!"
// // return true;

?>

<!DOCTYPE html>
<html lang="en">
<!-- http://sdetool.nl/sde_spreadsheet.xlsx -->
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Met SDEtool.nl berekent u eenvoudig de financiële haalbaarheid van uw zonneproject met SDE+ subsidie.">
    <meta name="keywords" content="sdetool, sde, sde+, berekenen, terugverdientijd, business case, subsidie, zonnepanelen, zon-pv, financieren, duurzaam, energie">

    <meta name="author" content="Balance Financial Incentives">

    <title>SDEtool.nl</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- Custom styles for this template -->
    <link href="css/agency.css" rel="stylesheet">

    <!-- Google Analytics -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-105806256-1', 'auto');
    ga('send', 'pageview');
    </script>
    <!-- End Google Analytics -->


    <!-- jQuery UI -->
    <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />


  </head>

  <body id="page-top">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="/"><span class="fa fa-bar-chart" aria-hidden="true" style="color: #3498db"></span><span id="navtitel">  SDEtool.nl</span></a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#services">Service</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#portfolio">Bereken Business Case</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">Aanvraagproces</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#team">Team</a>
            </li> -->
            <li class="nav-item">
              <a class="nav-link" data-toggle="modal" data-target="#myModal1">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <!-- Modal -->
    <div id="myModal1" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Neem contact met ons op</h4>
          </div>
          <div class="modal-body">
            <p>Neem contact op met Balance Financial Incentives:</p>
            <ul>
              <li>Bel <a href="tel:+31 20 676 3993">
                <i class="fa fa-phone"></i></a> 020 676 3993
              </li>
              <li>Voor meer informatie, ga naar <a href="https://www.balance.nl/expertise/subsidies">Balance.nl</a>
              </li>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>


    <!-- Header -->
    <header class="masthead">
      <div class="container">
        <div class="intro-text">
          <div id="flash" class="alert alert-success alert-dismissable text-center">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Gefeliciteerd met uw aanmelding voor onze SDE+ training op 11 maart aanstaande!</strong> <br>We hebben een bevestigingsmail verzonden naar <?php echo $email_ingevuld; ?>!
          </div>
          <!-- <h1 class="intro-lead-in">Zonnepanelen plaatsen?</h1>
          <h2 class="intro-heading">bereken direct uw subsidie</h2> -->
          <a class="btn btn-xl js-scroll-trigger" href="/">terug naar SDEtool</a>
        </div>
      </div>
    </header>

    <!-- Footer -->
    <footer class="bg-light" id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <span class="copyright">&copy; <a href="https://www.balance.nl/expertise/subsidies">Balance Financial Incentives</a> 2019</span>
          </div>
          <div class="col-md-4">
            <ul class="list-inline social-buttons">
              <li class="list-inline-item">
                <a href="tel:+31 20 676 3993">
                  <i class="fa fa-phone"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="mailto:cornevanstraten@balance.nl">
                  <i class="fa fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <ul class="list-inline quicklinks">
              <li class="list-inline-item">
                Tel: <a href="tel:020 676 3993"><strong>020 676 3993</strong></a>
              </li>
              <!-- <li class="list-inline-item">
                <a href="#">Terms of Use</a>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </footer>


    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/popper/popper.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Contact form JavaScript -->
    <script src="js/jqBootstrapValidation.js"></script>
    <script src="js/contact_me.js"></script>

    <!-- Custom scripts for this template -->
    <script src="js/agency.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script>
    <script type="text/javascript" src="js/SDEproject2019.js">    </script>
  </body>

</html>
