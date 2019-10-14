const profile = document.querySelector('div#profile');

profile.innerHTML = `
<div class="col-12 profile-head px-0 mx-0 row">
<div class="profile-image wow bounceInDown mx-auto mt-3 col-5  col-md-4 col-lg-3 col-xl-2 px-0">
    <img class="" src="../images/thanos.jpg" alt="Profile-image" style="width: 100%; height:100%; border-radius: 50%;">
</div><br>
<h3 style="animation-delay: 0.5s" class="text-center profile-name wow fadeIn col-12">Thanos</h3>
<h6 style="animation-delay: 0.7s" class="other-info text-center wow fadeIn col-12">Project Manager</h6>
</div>
<div class="profile-body row px-0 mx-0 col-12">
<div class="info-left col-12 col-md-6 mt-3">
    <form style="animation-delay:1s" class="wow fadeInRight basic-info col-11 row mx-auto px-0 border">
        <div class="col-12 form-group row info-fields mt-3 px-0 mx-auto">
            <h5 class="col-12 mt-2 mb-2">Basic Information</h5>
            <label for="profile-fname" class="col-5 col-form-label">Full Name</label>
            <div class="col-7">
                <input type="text" class="form-control border-0 px-0 box-shadow-0"
                    id="profile-fname" placeholder="Just Thanos">
            </div>
        </div>
        <!-- <div class="col-12 form-group row info-fields px-0 mx-auto">
            <label for="profile-lname" class="col-5 col-form-label">Last Name</label>
            <div class="col-7">
                <input type="text" class="form-control border-0 px-0 box-shadow-0"
                    id="profile-lname" placeholder="Maximoff">
            </div>
        </div> -->
        <div class="col-12 form-group row info-fields px-0 mx-auto">
            <label for="profile-email" class="col-5 col-form-label">Email Address</Address>
                </label>
            <div class="col-7">
                <input type="email" readonly class="form-control border-0 px-0 box-shadow-0"
                    id="profile-fname" placeholder="themadtitan@gmail.com">
            </div>
        </div>
        <div class="col-12 form-group row info-fields px-0 mb-0 mx-auto">
            <label for="profile-phone" class="col-5 col-form-label">Phone Number</Address>
                </label>
            <div class="col-7">
                <input type="tel" class="form-control border-0 px-0 box-shadow-0"
                    id="profile-fname" placeholder="07487463937">
            </div>
        </div>
        <button class="btn btn-outline-brand ml-auto mb-2 mr-3">Update</button>
    </form>
    <form class="wow fadeInRight additional-info col-11 mt-4 row mx-auto mb-5 px-0 border">
        <h5 class="col-12 mt-5 mb-2">Additional Information</h5>
        <div class="col-12 form-group row info-fields mt-3 px-0 mx-auto">
            <label for="profile-userid" class="col-5 col-form-label">User ID</label>
            <div class="col-7">
                <input type="text" readonly class="form-control border-0 px-0 box-shadow-0"
                    id="profile-userid" placeholder="01-46583AD">
            </div>
        </div>
        <div class="col-12 form-group row info-fields px-0 mx-auto">
            <label for="profile-dob" class="col-5 col-form-label">Date of Birth</label>
            <div class="col-7">
                <input type="date" readonly class="form-control border-0 px-0 box-shadow-0"
                    id="profile-dob" placeholder="">
            </div>
        </div>
        <div class="col-12 form-group row info-fields px-0 mx-auto">
            <label for="profile-gender" class="col-5 col-form-label">Gender</label>
            <div class="col-7">
                <select class="form-control border-0 px-0 box-shadow-0">
                    <option readonly>Female</option>
                    <option>Male</option>
                </select>
            </div>
        </div>
    </form>
</div>
<div class="col-12 col-md-6 info-right mt-3">
    <form style="animation-delay:1.4s" class="wow fadeInRight basic-info col-11 row mx-auto px-0 border">
        <h5 class="col-12 mt-2 mb-2">Change Password</h5>
        <div class="col-12 form-group row info-fields mt-3 px-0 mx-auto">
            <label for="profile-oldpwd" class="col-5 col-form-label">Old Password</label>
            <div class="col-7">
                <input type="password"
                    class="form-control border-radius-0 border-left-0 border-top-0 border-right-0 px-0 box-shadow-0"
                    id="profile-oldpwd" placeholder="">
            </div>
        </div>
        <div class="col-12 form-group row info-fields px-0 mx-auto">
            <label for="profile-newpwd" class="col-5 col-form-label">New
                    Password</label>
            <div class="col-7">
                <input type="password"
                    class="form-control border-radius-0  border-left-0 border-top-0 border-right-0 px-0 box-shadow-0"
                    id="profile-newpwd" placeholder="">
            </div>
        </div>
        <div class="col-12 form-group row info-fields px-0 mx-auto">
            <label for="profile-confirmpwd" style="font-size: 15px"
                class="col-5 col-form-label">Confirm Password</label>
            <div class="col-7">
                <input type="password"
                    class="form-control border-radius-0  border-left-0 border-top-0 border-right-0 px-0 box-shadow-0"
                    id="profile-confirmpwd" placeholder="">
            </div>
        </div>
        <button class="btn btn-outline-brand ml-auto mb-2 mr-3">Change</button>
    </form>
</div>
</div>


`