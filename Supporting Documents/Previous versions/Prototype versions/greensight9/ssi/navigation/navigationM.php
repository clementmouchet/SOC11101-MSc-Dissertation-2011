<ul id="menu" class="tabs">
	<li <?php include 'ssi/navigation/home_tab.php' ?>>
		<a href="home.php"><span>Home</span></a>
		<ul class="dropdown shadow corners">
			<li>
				<p class="desc centered margin">
					Where everything starts
				</p>
			</li>
		</ul>
	</li>
	<li <?php include 'ssi/navigation/amee_calc_tab.php' ?>>
		<a href="amee_calc.php"><span>AMEE Calculator</span></a>
		<ul class="dropdown shadow corners">
			<li>
				<p class="desc centered margin">
					Calculate a carbon footprint using AMEE database
				</p>
			</li>
		</ul>
	</li>
	<li <?php include 'aboutus_tab.php';?>>
        <a href="aboutus.php">About the website</a>
    </li>
	<li <?php include 'profile_tab.php' ?>>
        <a href="#">My Space</a>
        <ul id="logout_menu" class="logout dropdown shadow corners">
            <li>
                <p class="desc centered margin">
                    <?php echo ($_SESSION['user'] ? $_SESSION['user'] : $_COOKIE['user']); ?>
                </p>
                <p class="desc centered margin">
                    Remember to logout when on a public computer
                </p>
            </li>
            <li>
                <a class="dropdown_link centered corners" href="edit_profile.php">Edit Profile</a>
            </li>
            <li>
                <a class="dropdown_link centered corners" href="php_scripts/logout.php">Log out</a>
            </li>
        </ul>
    </li>
</ul>