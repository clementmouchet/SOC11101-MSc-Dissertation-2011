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
	<li <?php  if($page=='signup') echo " class='current_tab'";?>>
        <a href="login" class="login"><?php if($page=='signup') {echo 'Sign Up';} else {echo 'Log in';};?></a>
        <ul id="logindd" class="dropdown shadow corners">
            <li>
                <p class="desc centered margin">
                    To sign in or sign up!
                </p>
            </li>
        </ul>
        <fieldset id="login_menu" class="shadow login_menu">
            <div id="Login_result"></div>
            <form method="post" id="login" action="">
                <p>
                    <label for="email">email:</label> <input type="text" name="email" id="email" />
                </p>
                <p>
                    <label for="password">password:</label> <input type="password" name="password" id="password" />
                </p>
                <p>
                    <input class="submit" type="submit" value="Log in" /><!-- <a class="readvise" href="#" class="" id="readvise" name="readvise">Re-advise credentials</a> -->
                </p>
                <div style="clear:both"></div>
                <p class="centered">
                    <label for="signup" class="desc">Not a member yet?</label><a class="dropdown_link" href="signup.php" id="signup" name="signup">Create an account</a>
                </p>
            </form>
        </fieldset>
    </li>
</ul>