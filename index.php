<?php

$instruments = array(
	array('id' => 1, 	'name' => 'BT-1 -- High resolution powder diffractometer', 								'tag' => 'BT1'),
	array('id' => 20, 	'name' => 'BT-2 -- Neutron Imaging Facility', 											'tag' => 'BT2'),
	array('id' => 12, 	'name' => 'BT-4 -- FANS, Filter-analyzer neutron spectrometer', 						'tag' => 'BT4FANS'),
	array('id' => 23, 	'name' => 'BT-4 -- Triple-axis spectrometer', 											'tag' => 'BT4'),
	array('id' => 5, 	'name' => 'BT-5 -- USANS, Perfect SANS (CHRNS)', 										'tag' => 'USANS'),
	array('id' => 9, 	'name' => 'BT-7 -- Double-focusing Triple Axis Spectrometer', 							'tag' => 'BT7'),
	array('id' => 2, 	'name' => 'BT-8 -- Residual stress diffractometer', 									'tag' => 'BT8'),
	array('id' => 72, 	'name' => 'BT-9 -- Multiple Axis Crystal Spectrometer (MACS)', 							'tag' => 'MACS'),
	//array('id' => 10, 	'name' => 'BT-9 -- Triple-axis spectrometer', 											'tag' => 'bt9'),
	array('id' => 32, 	'name' => 'NAA -- Neutron Activation Analysis', 										'tag' => 'NAA'),
	//array('id' => 7, 	'name' => 'NG-1 -- ANDR, Advanced Neutron Diffractometer;Reflectometer', 				'tag' => 'ng1_2'),
	array('id' => 29, 	'name' => 'NG-1 -- Cold neutron depth profiling', 										'tag' => 'NDP'),
	//array('id' => 6, 	'name' => 'NG-1 -- Cold neutron reflectometer-vertical sample-polarized beam option', 	'tag' => 'ng1_1'),	
	array('id' => 15, 	'name' => 'NG-2 -- HFBS, High-flux backscattering spectrometer (CHRNS)', 				'tag' => 'HFBS'),
	array('id' => 4, 	'name' => 'NG-3 -- 30-m SANS instrument (CHRNS)', 										'tag' => 'NGB30SANS'),
	array('id' => 14, 	'name' => 'NG-4 -- DCS, Disk-chopper time-of-flight spectrometer (CHRNS)', 				'tag' => 'DCS'),
	array('id' => 16, 	'name' => 'NG-5 -- NSE, Neutron spin echo spectrometer (CHRNS)', 						'tag' => 'NSE'),
	array('id' => 11, 	'name' => 'NG-5 -- SPINS, Spin-polarized triple-axis spectrometer (CHRNS)', 			'tag' => 'SPINS'),
	array('id' => 22, 	'name' => 'NG-6 -- Fundamental neutron physics station', 								'tag' => 'NG6'),
	array('id' => 53, 	'name' => 'NG-6m -- Neutron Physics 0.5 nm', 											'tag' => 'NG6M'),
	array('id' => 52, 	'name' => 'NG-6u -- Neutron Physics 0.89 nm', 											'tag' => 'NG6U'),
	array('id' => 3, 	'name' => 'NG-7 -- 30-m SANS instrument', 												'tag' => 'NG7SANS'),
	array('id' => 8, 	'name' => 'NG-7 -- Cold neutron reflectometer-horizontal sample', 						'tag' => 'NG7R'),
	array('id' => 21, 	'name' => 'NG-7 -- Neutron interferometer', 											'tag' => 'NG7INT'),
	array('id' => 17, 	'name' => 'NG-7 -- Prompt-gamma neutron activation analysis', 							'tag' => 'PGAA'),
	array('id' => 172,  'name' => 'NG-7 -- Polarized <sup>3</sup>He and Detector Experiment Station (PHADES)',  'tag' => 'PHADES'),
	array('id' => 113, 	'name' => 'NG-D -- Off-Specular Reflectometer (MAGIK)', 								'tag' => 'MAGIK'),
	array('id' => 112,	'name' => 'NG-D -- Polarized Beam Reflectometer/Diffractometer (PBR)', 					'tag' => 'PBR'),
	array('id' => 18, 	'name' => 'VT-5 -- Thermal-neutron prompt-gamma activation analysis', 					'tag' => 'VT5'),
	array('id' => 92, 	'name' => 'BD8XRAY -- Bruker D8 X-ray Reflectometer', 									'tag' => 'BRUKER')
);

?>
<!DOCTYPE html>
<html>
	<head>
		<title>Instrument Schedule</title>
		<style type="text/css">
			a:link, a:vlink {text-decoration: none}
			ul li {
				padding-top: 0.5em;
			}
			h3, p { padding-left: 2em; }
		</style>
	</head>
	<body bgcolor="#FFFFFF"
		topmargin="0" leftmargin="0" marginwidth="0" marginheight="0"
		text="#000000" link="#0033ff" vlink="#0033ff" alink="#0033ff">
		
		<?php
			include('/var/www/include/navigation.inc');
			include('/var/www/include/utility.inc');
		?>
		<h3>Instrument Schedules</h3>
		<p>Please note that these schedules require javascript to be enabled
		   For a script-free schedule use the "table" link.</p>
		<ul>
		
		<?php
			foreach($instruments as $instrument) {
				$name = $instrument['name']; 
				$link = '<a class="link" href="ims_calendar.html?instruments=' . $instrument['tag'] . '">' . $name . '</a>';
				$table_link = '<a class="link" href="schedule.php?id=' . $instrument['id'] . '"> <em>table</em></a>';
				echo '<li>' . $link . '    ' . $table_link . '</li>';
			}
		?>
		</ul>
		<p>
			<font size="-1"><?php lastmod(); ?></font>
		</p>
	</body>
</html>

<!-- Well-written to be standards-compliant for our beloved fellow intern, Chris. -->
