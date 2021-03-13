webpackJsonp([6],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_profilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__picker_picker__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__location_select_location_select__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var My_profilePage = /** @class */ (function () {
    function My_profilePage(navCtrl, actionsheet, navparams, storage, http, formBuilder, toastController, camera) {
        this.navCtrl = navCtrl;
        this.actionsheet = actionsheet;
        this.navparams = navparams;
        this.storage = storage;
        this.http = http;
        this.formBuilder = formBuilder;
        this.toastController = toastController;
        this.camera = camera;
        this.category = '';
        this.segments = "basic";
        this.data = [];
        this.user = {};
        this.maxyear = (new Date().getFullYear() + 5);
        this.uploadedFiles = [];
        this.vehicle_subcats = [];
        this.registration_owner = '';
        this.google_address = '';
        this.qualification = ['No formal education', 'Primary education', 'Secondary education or high school', 'GED', 'Vocational qualification', 'Bachelor\'s degree', 'Master\'s degree', 'Doctorate or higher'];
        this.profile_picture = '';
        this.submitAttempt = false;
        this.showLoader = false;
    }
    My_profilePage.prototype.ngOnInit = function () {
        this.buildForm();
        this.setEmailValidators();
    };
    My_profilePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
            _this.showLoader = true;
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + _this.user.id + '?access-token=' + _this.user.token)
                .subscribe({
                next: function (response) {
                    _this.showLoader = false;
                    _this.data = response;
                    if (response.is_approved == 1) {
                        var toast = _this.toastController.create({
                            message: 'Modifying any documents will attract the re-approval from administrator.',
                            duration: 15000,
                            position: 'top',
                            cssClass: 'toast-info',
                            showCloseButton: true,
                            closeButtonText: 'OK'
                        });
                        toast.present();
                    }
                    var ignoreFields = ['upload_pan_card', 'upload_cancelled_cheque', 'upload_adhaar_card', 'upload_driving_licence', 'upload_bank_passbook'];
                    for (var i in response) {
                        if (_this.basicForm.controls[i] && response[i] != null && ignoreFields.indexOf(i) == -1) {
                            _this.basicForm.controls[i].setValue(response[i]);
                        }
                    }
                    for (var b in response) {
                        if (_this.bankForm.controls[b] && response[b] != null && ignoreFields.indexOf(b) == -1) {
                            _this.bankForm.controls[b].setValue(response[b]);
                        }
                    }
                    for (var c in response) {
                        if (_this.vehicleForm.controls[c] && response[c] != null && ignoreFields.indexOf(c) == -1) {
                            _this.vehicleForm.controls[c].setValue(response[c]);
                        }
                    }
                    //setting profile pic
                    if (_this.data.upload_photo != '' && _this.data.upload_photo != 'null') {
                        _this.profile_picture = __WEBPACK_IMPORTED_MODULE_7__app_apiconfig__["a" /* APIURL */] + '../../web' + _this.data.upload_photo;
                    }
                    //removing file validation if data already exists
                    if (_this.data.upload_cancelled_cheque != '' && _this.data.upload_cancelled_cheque != null) {
                        _this.bankForm.get('upload_cancelled_cheque').setValidators(null);
                        _this.bankForm.get('upload_cancelled_cheque').updateValueAndValidity();
                    }
                    if (_this.data.upload_driving_licence != '' && _this.data.upload_driving_licence != null) {
                        _this.vehicleForm.get('upload_driving_licence').setValidators(null);
                        _this.vehicleForm.get('upload_driving_licence').updateValueAndValidity();
                    }
                    /*if(this.data.upload_pan_card != '' && this.data.upload_pan_card != null){
                        this.basicForm.get('upload_pan_card').setValidators(null);
                        this.basicForm.get('upload_pan_card').updateValueAndValidity();
                    }*/
                    if (_this.data.upload_bank_passbook != '' && _this.data.upload_bank_passbook != null) {
                        _this.bankForm.get('upload_bank_passbook').setValidators(null);
                        _this.bankForm.get('upload_bank_passbook').updateValueAndValidity();
                    }
                    if (_this.data.upload_adhaar_card != '' && _this.data.upload_adhaar_card != null) {
                        _this.basicForm.get('upload_adhaar_card').setValidators(null);
                        _this.basicForm.get('upload_adhaar_card').updateValueAndValidity();
                    }
                    //enabling vehicle tab
                    var ids = _this.basicForm.get('subcat_id').value;
                    for (var m in ids) {
                        if (_this.vehicle_subcats.indexOf(ids[m]) != -1) {
                            _this.category = 'vehicle';
                            break;
                        }
                    }
                },
                error: function (error) {
                    _this.showLoader = false;
                    console.error('There was an error!', error);
                }
            });
        });
        this.http.get(__WEBPACK_IMPORTED_MODULE_7__app_apiconfig__["a" /* APIURL */] + 'service-providers/vehicle-subcats')
            .subscribe({
            next: function (response) {
                _this.vehicle_subcats = response;
            },
            error: function (error) {
                console.error('There was an error!', error);
            }
        });
    };
    My_profilePage.prototype.ionViewDidEnter = function () {
        if (typeof this.navparams.get('ids') != 'undefined') {
            this.basicForm.controls.skills.setValue(this.navparams.get('names'));
            this.basicForm.controls.subcat_id.setValue(this.navparams.get('ids').split(', '));
            //enabling vehicle tab
            var ids = this.navparams.get('ids').split(', ');
            for (var i in ids) {
                if (this.vehicle_subcats.indexOf(ids[i]) != -1) {
                    this.category = 'vehicle';
                    break;
                }
            }
        }
        if (typeof this.navparams.get('lat') != 'undefined') {
            this.basicForm.controls.lat.setValue(this.navparams.get('lat'));
            this.basicForm.controls.lng.setValue(this.navparams.get('lng'));
            this.google_address = this.navparams.get('address');
        }
    };
    My_profilePage.prototype.openFilePicker = function (id) {
        document.getElementById(id).querySelectorAll('input')[0].click();
    };
    My_profilePage.prototype.preview = function () {
        var _this = this;
        var files = document.getElementById('profilePic').querySelectorAll('input')[0].files;
        if (files.length === 0)
            return;
        var reader = new FileReader();
        this.imagePath = files;
        this.uploadedFiles.push({ upload_photo: files[0] });
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.profile_picture = reader.result;
        };
    };
    My_profilePage.prototype.buildForm = function () {
        this.basicForm = this.formBuilder.group({
            id: [this.data.id],
            is_approved: [this.data.is_approved],
            name: [this.data.name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            email: [this.data.email],
            skills: [this.data.skills, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            subcat_id: [''],
            lat: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            lng: [''],
            contact: [this.data.contact, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]{10}$')
                ])],
            father_name: [this.data.father_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            mother_name: [this.data.mother_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            present_address: [this.data.present_address, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            permenant_address: [this.data.permenant_address, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            shop_name: [this.data.shop_name],
            shop_address: [this.data.shop_address],
            shop_licence_no: [this.data.shop_licence_no],
            tel_no: [this.data.tel_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(11),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(11),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]{11}$')
                ])],
            gst_no: [this.data.gst_no],
            pancard_no: [this.data.pancard_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[A-Za-z]{5}[0-9]{4}[a-zA-Z]{1}$')
                ])],
            adhaar_card_no: [this.data.adhaar_card_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]{12}$')
                ])],
            education_qualification: [this.data.education_qualification, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            reference1_name: [this.data.reference1_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            reference1_contact: [this.data.reference1_contact, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]{10}$')
                ])],
            reference2_name: [this.data.reference2_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            reference2_contact: [this.data.reference2_contact, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]{10}$')
                ])],
            upload_pan_card: [''],
            upload_adhaar_card: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        this.vehicleForm = this.formBuilder.group({
            vehicle_owner: [this.data.vehicle_owner],
            driving_licence_no: [this.data.driving_licence_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            permit_licence_no: [this.data.permit_licence_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            batch_no: [this.data.batch_no],
            car_rikshaw_reg_no: [this.data.car_rikshaw_reg_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            rc_book_no: [this.data.rc_book_no, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            puc: [this.data.puc],
            car_rikshaw_insurance_dt: [this.data.car_rikshaw_insurance_dt, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            upload_driving_licence: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        this.bankForm = this.formBuilder.group({
            account_type: ['Saving Account'],
            accountholder: [this.data.accountholder_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            bank: [this.data.bank_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            branch: [this.data.branch, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            accountnumber: [this.data.account_number, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]*$')
                ])],
            ifsc: [this.data.ifsc_code, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            upload_cancelled_cheque: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            upload_bank_passbook: [''],
        });
    };
    My_profilePage.prototype.setEmailValidators = function () {
        var emailControl = this.basicForm.get('email');
        emailControl.valueChanges.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["distinctUntilChanged"])()).subscribe(function (value) {
            if (value != '') {
                emailControl.setValidators(__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$'));
            }
            else {
                emailControl.setValidators(null);
            }
            emailControl.updateValueAndValidity();
        });
    };
    My_profilePage.prototype.setVehicleOwnerValidators = function () {
        var vehicleOwnerControl = this.vehicleForm.get('vehicle_owner');
        if (this.registration_owner == 'No') {
            vehicleOwnerControl.setValidators(__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required);
        }
        else {
            vehicleOwnerControl.setValidators(null);
        }
        vehicleOwnerControl.updateValueAndValidity();
    };
    My_profilePage.prototype.openPicker = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__picker_picker__["a" /* PickerPage */], { ids: this.basicForm.controls.subcat_id.value });
    };
    My_profilePage.prototype.openLocationPicker = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__location_select_location_select__["a" /* LocationSelect */]);
    };
    My_profilePage.prototype.urltoFile = function (url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
            .catch(function (err) { return alert(err.message); }));
    };
    My_profilePage.prototype.DataURIToBlob = function (dataURI) {
        var splitDataURI = dataURI.split(',');
        var byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
        var mimeString = splitDataURI[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i);
        return new Blob([ia], { type: mimeString });
    };
    My_profilePage.prototype.actionSheetFile = function (field) {
        var _this = this;
        var actionSheet = this.actionsheet.create({
            title: (field == 'pp') ? 'Set your display picture' : 'Select Document to Upload',
            buttons: [
                {
                    text: 'Browse Photo Albums',
                    role: 'destructive',
                    handler: function () {
                        var options = {
                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            correctOrientation: true
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            if (field == 'pp') {
                                _this.profile_picture = base64Image;
                            }
                            switch (field) {
                                case 'pp':
                                    _this.uploadedFiles.push({ upload_photo: base64Image });
                                    break;
                                case 'pan':
                                    _this.uploadedFiles.push({ upload_pan_card: base64Image });
                                    var elem1 = document.getElementById('upload_pan_card').parentElement;
                                    elem1.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    //this.basicForm.get('upload_pan_card').setValidators(null);
                                    //this.basicForm.get('upload_pan_card').updateValueAndValidity();
                                    break;
                                case 'adhaar':
                                    _this.uploadedFiles.push({ upload_adhaar_card: base64Image });
                                    var elem2 = document.getElementById('upload_adhaar_card').parentElement;
                                    elem2.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.basicForm.get('upload_adhaar_card').setValidators(null);
                                    _this.basicForm.get('upload_adhaar_card').updateValueAndValidity();
                                    break;
                                case 'passbook':
                                    _this.uploadedFiles.push({ upload_bank_passbook: base64Image });
                                    var elem3 = document.getElementById('upload_bank_passbook').parentElement;
                                    elem3.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.bankForm.get('upload_bank_passbook').setValidators(null);
                                    _this.bankForm.get('upload_bank_passbook').updateValueAndValidity();
                                    break;
                                case 'cheque':
                                    _this.uploadedFiles.push({ upload_cancelled_cheque: base64Image });
                                    var elem4 = document.getElementById('upload_cancelled_cheque').parentElement;
                                    elem4.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.bankForm.get('upload_cancelled_cheque').setValidators(null);
                                    _this.bankForm.get('upload_cancelled_cheque').updateValueAndValidity();
                                    break;
                                case 'license':
                                    _this.uploadedFiles.push({ upload_driving_licence: base64Image });
                                    var elem5 = document.getElementById('upload_driving_licence').parentElement;
                                    elem5.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.vehicleForm.get('upload_driving_licence').setValidators(null);
                                    _this.vehicleForm.get('upload_driving_licence').updateValueAndValidity();
                                    break;
                            }
                        }, function (err) {
                            console.error(err);
                        });
                    }
                },
                {
                    text: 'Open Camera',
                    role: 'destructive',
                    handler: function () {
                        var options = {
                            quality: 100,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            correctOrientation: true,
                            cameraDirection: 1
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            if (field == 'pp') {
                                _this.profile_picture = base64Image;
                            }
                            switch (field) {
                                case 'pp':
                                    _this.uploadedFiles.push({ upload_photo: base64Image });
                                    break;
                                case 'pan':
                                    _this.uploadedFiles.push({ upload_pan_card: base64Image });
                                    var elem1 = document.getElementById('upload_pan_card').parentElement;
                                    elem1.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    //this.basicForm.get('upload_pan_card').setValidators(null);
                                    //this.basicForm.get('upload_pan_card').updateValueAndValidity();
                                    break;
                                case 'adhaar':
                                    _this.uploadedFiles.push({ upload_adhaar_card: base64Image });
                                    var elem2 = document.getElementById('upload_adhaar_card').parentElement;
                                    elem2.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.basicForm.get('upload_adhaar_card').setValidators(null);
                                    _this.basicForm.get('upload_adhaar_card').updateValueAndValidity();
                                    break;
                                case 'passbook':
                                    _this.uploadedFiles.push({ upload_bank_passbook: base64Image });
                                    var elem3 = document.getElementById('upload_bank_passbook').parentElement;
                                    elem3.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.bankForm.get('upload_bank_passbook').setValidators(null);
                                    _this.bankForm.get('upload_bank_passbook').updateValueAndValidity();
                                    break;
                                case 'cheque':
                                    _this.uploadedFiles.push({ upload_cancelled_cheque: base64Image });
                                    var elem4 = document.getElementById('upload_cancelled_cheque').parentElement;
                                    elem4.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.bankForm.get('upload_cancelled_cheque').setValidators(null);
                                    _this.bankForm.get('upload_cancelled_cheque').updateValueAndValidity();
                                    break;
                                case 'license':
                                    _this.uploadedFiles.push({ upload_driving_licence: base64Image });
                                    var elem5 = document.getElementById('upload_driving_licence').parentElement;
                                    elem5.getElementsByTagName('ion-icon')[0].innerText = 'check';
                                    _this.vehicleForm.get('upload_driving_licence').setValidators(null);
                                    _this.vehicleForm.get('upload_driving_licence').updateValueAndValidity();
                                    break;
                            }
                        }, function (err) {
                            console.error(err);
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    My_profilePage.prototype.uploadFile = function (id) {
        var file = document.getElementById(id).querySelectorAll('input')[0].files[0];
        this.uploadedFiles.push((_a = {}, _a[id] = file, _a));
        var elem = document.getElementById(id).parentElement;
        elem.getElementsByTagName('ion-icon')[0].innerText = 'check';
        var _a;
    };
    My_profilePage.prototype.segmentChanged = function (e) {
        this.segments = e._value;
    };
    My_profilePage.prototype.showNextSegment = function () {
        this.submitAttempt = true;
        this.setVehicleOwnerValidators();
        switch (this.segments) {
            case 'basic':
                if (!this.basicForm.valid)
                    return false;
                if (this.category == 'vehicle') {
                    this.segments = 'vehicle';
                }
                else {
                    this.segments = 'bank';
                }
                break;
            case 'vehicle':
                if (!this.vehicleForm.valid)
                    return false;
                this.segments = 'bank';
                break;
            case 'bank':
                if (!this.bankForm.valid)
                    return false;
                this.save();
                break;
            default:
                this.segments = 'basic';
                break;
        }
    };
    My_profilePage.prototype.save = function () {
        var _this = this;
        var formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append(Object.keys(this.uploadedFiles[i])[0], this.uploadedFiles[i][Object.keys(this.uploadedFiles[i])[0]]);
        }
        for (var j in this.basicForm.value) {
            if (['upload_photo', 'upload_pan_card', 'upload_adhaar_card'].indexOf(j) == -1) {
                formData.append(j, this.basicForm.value[j]);
            }
        }
        for (var k in this.vehicleForm.value) {
            if (['upload_driving_licence'].indexOf(k) == -1 && this.vehicleForm.value[k] != 'null') {
                formData.append(k, this.vehicleForm.value[k]);
            }
        }
        for (var l in this.bankForm.value) {
            if (['upload_cancelled_cheque', 'upload_bank_passbook'].indexOf(l) == -1 && this.bankForm.value[l] != 'null') {
                formData.append(l, this.bankForm.value[l]);
            }
        }
        console.log(formData);
        this.showLoader = true;
        this.http.put(__WEBPACK_IMPORTED_MODULE_7__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + this.user.id + '?access-token=' + this.user.token, formData)
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                var toast = _this.toastController.create({
                    message: 'Your profile was successfully updated. You will be notified once your profile is approved.',
                    duration: 5000,
                    cssClass: 'toast-success'
                });
                toast.present();
                var that = _this;
                setTimeout(function () {
                    that.navCtrl.pop();
                }, 5000);
            },
            error: function (error) {
                console.error('There was an error!', error);
            }
        });
    };
    My_profilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my_profile',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\my_profile\my_profile.html"*/'<ion-header class="bg-color">\n    <ion-navbar>\n        <ion-title>{{\'my_profile\' | translate}}</ion-title>\n    </ion-navbar>\n    \n    <ion-toolbar>\n        <ion-segment [(ngModel)]="segments" color="secondary">\n          <ion-segment-button value="basic">Basic Details</ion-segment-button>\n          <ion-segment-button [disabled]="segments == \'basic\'" [hidden]="category != \'vehicle\'" value="vehicle">Vehicle Details</ion-segment-button>\n          <ion-segment-button [disabled]="segments != \'bank\'" value="bank">Bank Details</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <div [hidden]="segments != \'basic\'" class="form">\n        <form [formGroup]="basicForm">\n            <ion-grid>\n                <ion-row>\n                    <ion-col col-6>\n                        <div class="profile">\n                            <div (click)="actionSheetFile(\'pp\')" class="profile_img center_img">\n                                <img src="{{(profile_picture) ? profile_picture : \'assets/imgs/avatar.png\'}}" class="crop_img loading" onerror="this.onerror=null;this.src=\'assets/imgs/avatar.png\';" /> \n                            </div>\n                            <ion-icon (click)="actionSheetFile(\'pp\')" class="material-icons">camera_alt</ion-icon>\n                        </div>\n                    </ion-col>\n                    <ion-col col-6>\n                        <div class="vstatus">\n                            <h4 class="text-md-light">Verification Status</h4>\n                            <h4 *ngIf="data.is_approved == 1" class="text-md-primary"><ion-icon class="vicon material-icons">verified_user</ion-icon> Verified</h4>\n                            <h4 *ngIf="data.is_approved == 0" class="text-md-warning"><ion-icon class="vicon material-icons">watch_later</ion-icon> Pending</h4>\n                        </div>    \n                    </ion-col>    \n                </ion-row>\n            </ion-grid>            \n            \n            <ion-list no-lines>\n                <ion-item [class.invalid]="!basicForm.controls.name.valid && (basicForm.controls.name.dirty || submitAttempt)">\n                    <ion-label color="primary">Full Name</ion-label>\n                    <ion-input type="text" readonly formControlName="name"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.name.valid  && (basicForm.controls.name.dirty || submitAttempt)">Please enter your full name.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.contact.valid && (basicForm.controls.contact.dirty || submitAttempt)">\n                    <ion-label color="primary">Mobile Number</ion-label>\n                    <ion-input type="tel" readonly formControlName="contact"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.contact.valid  && (basicForm.controls.contact.dirty || submitAttempt)">Please enter a valid Mobile Number.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.email.valid && (basicForm.controls.email.dirty || submitAttempt)">\n                    <ion-label color="primary">Email Address</ion-label>\n                    <ion-input type="text" formControlName="email"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.email.valid  && (basicForm.controls.email.dirty || submitAttempt)">Please enter a valid Email Address.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.father_name.valid && (basicForm.controls.father_name.dirty || submitAttempt)">\n                    <ion-label color="primary">Father\'s Name</ion-label>\n                    <ion-input type="text" formControlName="father_name"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.father_name.valid  && (basicForm.controls.father_name.dirty || submitAttempt)">Please enter your Father\'s Name.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.mother_name.valid && (basicForm.controls.mother_name.dirty || submitAttempt)">\n                    <ion-label color="primary">Mother\'s Name</ion-label>\n                    <ion-input type="text" formControlName="mother_name"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.mother_name.valid && (basicForm.controls.mother_name.dirty || submitAttempt)">Please enter your Mother\'s Name.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.present_address.valid && (basicForm.controls.present_address.dirty || submitAttempt)">\n                    <ion-label color="primary">Present Address</ion-label>\n                    <ion-textarea rows="4" formControlName="present_address"></ion-textarea>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.present_address.valid  && (basicForm.controls.present_address.dirty || submitAttempt)">Please enter your current residential address.</p>\n\n                <div align="center" style="margin-top:10px">\n                    <button ion-button block icon-start (click)="openLocationPicker()">\n                      <ion-icon name="locate"></ion-icon>\n                      Locate Address\n                    </button>\n                    <p style="color:white; padding: 5px 0" *ngIf="google_address">{{google_address}}</p>\n                    <p class=\'error\' *ngIf="!basicForm.controls.lat.valid && (basicForm.controls.lat.dirty || submitAttempt)">Please select address location on map.</p>\n                </div>    \n\n                <ion-item [class.invalid]="!basicForm.controls.permenant_address.valid && (basicForm.controls.permenant_address.dirty || submitAttempt)">\n                    <ion-label color="primary">Permanent Address</ion-label>\n                    <ion-textarea rows="4" formControlName="permenant_address"></ion-textarea>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.permenant_address.valid  && (basicForm.controls.permenant_address.dirty || submitAttempt)">Please enter your permanent residential address.</p>\n\n                <ion-item>\n                    <ion-label color="primary">Shop / Business Name</ion-label>\n                    <ion-input type="text" formControlName="shop_name"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="primary">Shop Address</ion-label>\n                    <ion-textarea rows="4" formControlName="shop_address"></ion-textarea>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="primary">Shop License No.</ion-label>\n                    <ion-input type="text" formControlName="shop_licence_no"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="primary">Telephone Number</ion-label>\n                    <ion-input type="tel" maxlength="11" formControlName="tel_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.tel_no.valid  && (basicForm.controls.tel_no.dirty || submitAttempt)">Please enter valid telephone number.</p>\n\n                <ion-item>\n                    <ion-label color="primary">GST Number</ion-label>\n                    <ion-input type="text" formControlName="gst_no"></ion-input>\n                </ion-item>\n                <ion-item [class.invalid]="!basicForm.controls.pancard_no.valid && (basicForm.controls.pancard_no.dirty || submitAttempt)">\n                    <ion-label color="primary">PAN Card Number</ion-label>\n                    <ion-input type="text" maxlength="10" class="uppercase" formControlName="pancard_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.pancard_no.valid  && (basicForm.controls.pancard_no.dirty || submitAttempt)">Please enter your PAN card number.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.adhaar_card_no.valid && (basicForm.controls.adhaar_card_no.dirty || submitAttempt)">\n                    <ion-label color="primary">Aadhaar Card Number</ion-label>\n                    <ion-input type="text" maxlength="12" formControlName="adhaar_card_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.adhaar_card_no.valid  && (basicForm.controls.adhaar_card_no.dirty || submitAttempt)">Please enter your Aadhaar card number.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.education_qualification.valid && (basicForm.controls.education_qualification.dirty || submitAttempt)">\n                    <ion-label color="primary">Educational Qualification</ion-label>\n                    <ion-select placeholder="--Select--" formControlName="education_qualification">\n                        <ion-option *ngFor="let item of qualification" value="{{item}}">{{item}}</ion-option>\n                    </ion-select>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.education_qualification.valid  && (basicForm.controls.education_qualification.dirty || submitAttempt)">Please select your Educational Qualification.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.skills.valid && (basicForm.controls.skills.dirty || submitAttempt)">\n                    <ion-label color="primary">Skills</ion-label>\n                    <ion-input type="text" (ionFocus)="openPicker()" formControlName="skills"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.skills.valid  && (basicForm.controls.skills.dirty || submitAttempt)">Please enter your skills.</p>\n\n                <div style="margin: 20px 0 10px 0">\n                    <button ion-button block (click)="actionSheetFile(\'pan\')"><ion-icon class="material-icons">file_copy</ion-icon> Upload Pan Card</button>\n                    <ion-input style="display:none" type="file" accept="application/pdf,image/*" id="upload_pan_card" (ionChange)="uploadFile(\'upload_pan_card\')" formControlName="upload_pan_card"></ion-input>\n                </div>\n\n                <div style="margin: 20px 0 10px 0">\n                    <button ion-button block (click)="actionSheetFile(\'adhaar\')"><ion-icon class="material-icons">file_copy</ion-icon> Upload Adhaar Card</button>\n                    <ion-input style="display:none" type="file" accept="application/pdf,image/*" id="upload_adhaar_card" (ionChange)="uploadFile(\'upload_adhaar_card\')" formControlName="upload_adhaar_card"></ion-input>\n                </div>\n                <p class=\'error\' *ngIf="!basicForm.controls.upload_adhaar_card.valid  && (basicForm.controls.upload_adhaar_card.dirty || submitAttempt)">Please upload a copy of your Aadhaar Card.</p>\n            </ion-list> \n\n            <ion-list>\n                <ion-list-header class="text-md-light text-md-uppercase">Please provide 2 reference details</ion-list-header>\n                <ion-item [class.invalid]="!basicForm.controls.reference1_name.valid && (basicForm.controls.reference1_name.dirty || submitAttempt)">\n                    <ion-label color="primary">Reference 1 Name</ion-label>\n                    <ion-input type="text" formControlName="reference1_name"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.reference1_name.valid  && (basicForm.controls.reference1_name.dirty || submitAttempt)">Please enter Reference name.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.reference1_contact.valid && (basicForm.controls.reference1_contact.dirty || submitAttempt)">\n                    <ion-label color="primary">Reference 1 Phone</ion-label>\n                    <ion-input type="tel" maxlength="10" formControlName="reference1_contact"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.reference1_contact.valid  && (basicForm.controls.reference1_contact.dirty || submitAttempt)">Please enter valid contact number.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.reference2_name.valid && (basicForm.controls.reference2_name.dirty || submitAttempt)">\n                    <ion-label color="primary">Reference 2 Name</ion-label>\n                    <ion-input type="text" formControlName="reference2_name"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.reference2_name.valid  && (basicForm.controls.reference2_name.dirty || submitAttempt)">Please enter Reference name.</p>\n\n                <ion-item [class.invalid]="!basicForm.controls.reference2_contact.valid && (basicForm.controls.reference2_contact.dirty || submitAttempt)">\n                    <ion-label color="primary">Reference 2 Phone</ion-label>\n                    <ion-input type="tel" maxlength="10" formControlName="reference2_contact"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!basicForm.controls.reference2_contact.valid  && (basicForm.controls.reference2_contact.dirty || submitAttempt)">Please enter valid contact number.</p>\n\n            </ion-list>     \n        </form>    \n\n        <button ion-button block (click)="showNextSegment()">NEXT <ion-icon class="material-icons">arrow_forward</ion-icon></button>\n        <br/>  \n    </div>\n\n    <div [hidden]="segments != \'vehicle\'" class="form">\n        <form [formGroup]="vehicleForm">\n            <ion-list no-lines>\n                <ion-item>\n                    <ion-label>Is vehicle registered on your name?</ion-label>\n                    <ion-select [ngModelOptions]="{standalone:true}" [(ngModel)]="registration_owner">\n                        <ion-option selected value="Yes">Yes</ion-option>\n                        <ion-option value="No">No</ion-option>\n                    </ion-select>\n                </ion-item>\n                <ion-item *ngIf="registration_owner == \'No\'">\n                    <ion-label>Vehicle Owner Name</ion-label>\n                    <ion-input type="text" formControlName="vehicle_owner"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.vehicle_owner.valid && registration_owner == \'No\' && (vehicleForm.controls.vehicle_owner.dirty || submitAttempt)">Please enter Vehicle Owner\'s Name.</p>    \n\n                <ion-item>\n                    <ion-label color="primary">Driving License No.</ion-label>\n                    <ion-input type="text" formControlName="driving_licence_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.driving_licence_no.valid && (vehicleForm.controls.driving_licence_no.dirty || submitAttempt)">Please enter Driving License Number.</p>    \n\n                <ion-item>\n                    <ion-label color="primary">Permit No.</ion-label>\n                    <ion-input type="text" formControlName="permit_licence_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.permit_licence_no.valid && (vehicleForm.controls.permit_licence_no.dirty || submitAttempt)">Please enter Permit Number.</p>\n\n                <ion-item>\n                    <ion-label color="primary">Batch No.</ion-label>\n                    <ion-input type="text" formControlName="batch_no"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label color="primary">Vehicle Registration No.</ion-label>\n                    <ion-input type="text" formControlName="car_rikshaw_reg_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.car_rikshaw_reg_no.valid && (vehicleForm.controls.car_rikshaw_reg_no.dirty || submitAttempt)">Please enter Vehicle Registration Number.</p>\n\n                <ion-item>\n                    <ion-label color="primary">RC Book No.</ion-label>\n                    <ion-input type="text" formControlName="rc_book_no"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.rc_book_no.valid && (vehicleForm.controls.rc_book_no.dirty || submitAttempt)">Please enter RC Book Number.</p>\n\n                <ion-item>\n                    <ion-label color="primary">PUC End Date</ion-label>\n                    <ion-datetime displayFormat="DD MMM YYYY" max="{{maxyear}}" formControlName="puc"></ion-datetime>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label color="primary">Insurance Expiry Date</ion-label>\n                    <ion-datetime displayFormat="DD MMM YYYY" max="{{maxyear}}" formControlName="car_rikshaw_insurance_dt"></ion-datetime>\n                </ion-item>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.car_rikshaw_insurance_dt.valid && (vehicleForm.controls.car_rikshaw_insurance_dt.dirty || submitAttempt)">Please enter Insurance Expiry Date.</p>\n\n                <div style="margin: 20px 0 10px 0">\n                    <button ion-button block (click)="actionSheetFile(\'license\')"><ion-icon class="material-icons">file_copy</ion-icon> Upload Driving License</button>\n                    <ion-input style="display:none" type="file" accept="application/pdf,image/*" id="upload_driving_licence" (ionChange)="uploadFile(\'upload_driving_licence\')" formControlName="upload_driving_licence"></ion-input>\n                </div>\n                <p class=\'error\' *ngIf="!vehicleForm.controls.upload_driving_licence.valid && (vehicleForm.controls.upload_driving_licence.dirty || submitAttempt)">Please upload copy of Driving License.</p>\n\n            </ion-list>\n        </form>     \n\n        <button ion-button block (click)="showNextSegment()">NEXT <ion-icon class="material-icons">arrow_forward</ion-icon></button>\n        <br/>     \n    </div>\n\n    <div [hidden]="segments != \'bank\'" class="form">\n        <form [formGroup]="bankForm">\n            <ion-list no-lines>\n                <ion-item>\n                    <ion-label color="primary">Account Type</ion-label>\n                    <ion-select formControlName="account_type">\n                        <ion-option value="Saving Account">Saving Account</ion-option>\n                        <ion-option value="Current Account">Current Account</ion-option>\n                    </ion-select>\n                </ion-item>\n                <ion-item class="docs">\n                    <ion-label stacked color="primary">Account Details</ion-label>\n                    <ion-input formControlName="accountholder" placeholder="Account Holder Name"></ion-input>\n                    <ion-input formControlName="bank" placeholder="Bank Name"></ion-input>\n                    <ion-input formControlName="branch" placeholder="Branch Name"></ion-input>\n                    <ion-input formControlName="accountnumber" placeholder="Account Number"></ion-input>\n                    <ion-input formControlName="ifsc" placeholder="IFSC Code"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!bankForm.controls.accountholder.valid  && (bankForm.controls.accountholder.dirty || submitAttempt)">Please enter Account Holder Name.</p>\n                <p class=\'error\' *ngIf="!bankForm.controls.bank.valid  && (bankForm.controls.bank.dirty || submitAttempt)">Please enter Bank Name.</p>\n                <p class=\'error\' *ngIf="!bankForm.controls.branch.valid  && (bankForm.controls.branch.dirty || submitAttempt)">Please enter Branch Name.</p>\n                <p class=\'error\' *ngIf="!bankForm.controls.accountnumber.valid  && (bankForm.controls.accountnumber.dirty || submitAttempt)">Please enter valid Account Number.</p>\n                <p class=\'error\' *ngIf="!bankForm.controls.ifsc.valid  && (bankForm.controls.ifsc.dirty || submitAttempt)">Please enter Bank\'s IFSC Code.</p>\n\n                <div style="margin: 20px 0 10px 0">\n                    <button ion-button block (click)="actionSheetFile(\'cheque\')"><ion-icon class="material-icons">file_copy</ion-icon> Upload Cancelled Cheque</button>\n                    <ion-input style="display:none" type="file" accept="application/pdf,image/*" id="upload_cancelled_cheque" (ionChange)="uploadFile(\'upload_cancelled_cheque\')" formControlName="upload_cancelled_cheque"></ion-input>\n                </div>\n                <p class=\'error\' *ngIf="!bankForm.controls.upload_cancelled_cheque.valid  && (bankForm.controls.upload_cancelled_cheque.dirty || submitAttempt)">Please upload copy of Cancelled Cheque.</p>\n\n                <div style="margin: 20px 0 10px 0">\n                    <button ion-button block (click)="actionSheetFile(\'passbook\')"><ion-icon class="material-icons">file_copy</ion-icon> Upload Bank Passbook</button>\n                    <ion-input style="display:none" type="file" accept="application/pdf,image/*" id="upload_bank_passbook" (ionChange)="uploadFile(\'upload_bank_passbook\')" formControlName="upload_bank_passbook"></ion-input>\n                </div>\n            </ion-list>\n        </form>     \n\n        <button ion-button block (click)="showNextSegment()">SAVE</button>\n        <br/>     \n    </div>\n</ion-content>'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\my_profile\my_profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
    ], My_profilePage);
    return My_profilePage;
}());

//# sourceMappingURL=my_profile.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, storage, http, navParams, toastController) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        this.navParams = navParams;
        this.toastController = toastController;
        this.submitAttempt = false;
        this.showLoader = false;
        this.pass = '';
        this.cpass = '';
        this.oldpass = '';
        this.user = {};
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
        });
    };
    ChangePasswordPage.prototype.updatePass = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.pass || !this.cpass || !this.oldpass) {
            return false;
        }
        if (this.pass.trim() !== this.cpass.trim()) {
            this.showLoader = false;
            var toast = this.toastController.create({
                message: 'Password and Confirm Password does not match.',
                duration: 4000,
                cssClass: 'toast-danger',
                position: 'top'
            });
            toast.present();
            return false;
        }
        else if (this.pass.indexOf(' ') != -1) {
            var toast = this.toastController.create({
                message: 'Password cannot contain spaces.',
                duration: 4000,
                cssClass: 'toast-danger',
                position: 'top'
            });
            toast.present();
            return false;
        }
        else {
            this.showLoader = true;
            this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'service-providers/update-password', { id: this.user['id'], current: this.oldpass.trim(), secretkey: this.pass.trim() })
                .subscribe({
                next: function (response) {
                    _this.showLoader = false;
                    if (response.error == 1) {
                        var toast = _this.toastController.create({
                            message: response.reason,
                            duration: 4000,
                            cssClass: 'toast-danger',
                            position: 'top'
                        });
                        toast.present();
                    }
                    else {
                        var toast = _this.toastController.create({
                            message: 'Password updated successfully.',
                            duration: 4000,
                            cssClass: 'toast-success',
                            position: 'top'
                        });
                        toast.present();
                        setTimeout(function () { return _this.navCtrl.pop(); }, 1000);
                    }
                },
                error: function (err) {
                    _this.showLoader = false;
                    var toast = _this.toastController.create({
                        message: err.message,
                        duration: 4000,
                        cssClass: 'toast-danger',
                        position: 'top'
                    });
                    toast.present();
                }
            });
        }
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-password',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\change-password\change-password.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Change Password</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="bg-color" padding>\n	<div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <div class="form">\n	    <ion-list>\n	    	<ion-item>\n	    		<ion-label floating>Current Password</ion-label>\n	    		<ion-input type="password" [(ngModel)]="oldpass"></ion-input>\n	    	</ion-item>	\n	    	<p class=\'error\' *ngIf="(!oldpass.trim()) && submitAttempt">Please enter current password.</p>\n\n	    	<ion-item>\n	    		<ion-label floating>New Password</ion-label>\n	    		<ion-input type="password" [(ngModel)]="pass"></ion-input>\n	    	</ion-item>	\n	    	<p class=\'error\' *ngIf="(!pass.trim() || pass.length < 8) && submitAttempt">Please enter password of minimum 8 characters.</p>\n\n	    	<ion-item>\n	    		<ion-label floating>Confirm Password</ion-label>\n	    		<ion-input type="password" [(ngModel)]="cpass"></ion-input>\n	    	</ion-item>\n	    	<p class=\'error\' *ngIf="(!cpass.trim() || cpass.length < 8) && submitAttempt">Please confirm by re-entering the password entered above.</p>\n\n	    	<button block ion-button (click)="updatePass()">CHANGE PASSWORD</button>	\n	    </ion-list> \n	</div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\change-password\change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EarningsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_apiconfig__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the EarningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EarningsPage = /** @class */ (function () {
    function EarningsPage(navCtrl, platform, navParams, storage, http) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.user = {};
        this.showLoader = true;
        this.earnings = { daily_earnings: [] };
    }
    EarningsPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
            //check this approval status in order api, no need to separately hit this.
            _this.http.get(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/earnings?access-token=' + _this.user.token)
                .subscribe({
                next: function (data) {
                    _this.showLoader = false;
                    _this.earnings = data;
                },
                error: function (error) {
                    _this.showLoader = false;
                    console.error('There was an error!', error);
                }
            });
        });
    };
    EarningsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-earnings',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\earnings\earnings.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Earnings</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color" padding>\n	<div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n	<ion-card class="top-card">\n	  <ion-card-header>\n	    <ion-card-title class="settlement-amount">{{earnings.psettlement ? (earnings.psettlement | currency : "₹") : (0 | currency : "₹")}}</ion-card-title>\n	    <ion-card-title>Total Pending Settlement</ion-card-title>\n	  </ion-card-header>\n	</ion-card>\n\n	<ion-card class="top2-card">\n	  <ion-card-header>\n	    <ion-card-title class="settlement-amount">{{earnings.owe ? (earnings.owe | currency : "₹") : (0 | currency : "₹")}}</ion-card-title>\n	    <ion-card-title>I Owe Everything</ion-card-title>\n	  </ion-card-header>\n	</ion-card>\n\n	<ion-grid>\n		<ion-row>\n			<ion-col col-6>\n				<ion-card class="no-margin">\n					<ion-card-content>\n						<div>\n							<h2>{{earnings.gross_today ? (earnings.gross_today | currency : "₹") : (0 | currency : "₹")}}</h2>\n							<h5>Today\'s Gross Earning</h5>\n						</div>	\n					</ion-card-content>\n				</ion-card>		\n			</ion-col>\n			<ion-col col-6>\n				<ion-card class="no-margin">\n					<ion-card-content>\n						<div>\n							<h2>{{earnings.net_today ? (earnings.net_today | currency : "₹") : (0 | currency : "₹")}}</h2>\n							<h5>Today\'s Net Earning</h5>\n						</div>	\n					</ion-card-content>\n				</ion-card>		\n			</ion-col>\n			<ion-col col-6>\n				<ion-card class="no-margin">\n					<ion-card-content>\n						<div>\n							<h2>{{earnings.total_net_earnings ? (earnings.total_net_earnings | currency : "₹") : (0 | currency : "₹")}}</h2>\n							<h5>Net Earnings Till Date</h5>\n						</div>	\n					</ion-card-content>\n				</ion-card>		\n			</ion-col>\n			<ion-col col-6>\n				<ion-card class="no-margin">\n					<ion-card-content>\n						<div>\n							<h2>{{earnings.total_net_settlement ? (earnings.total_net_settlement | currency : "₹") : (0 | currency : "₹")}}</h2>\n							<h5>Total Settlement Till Date</h5>\n						</div>	\n					</ion-card-content>\n				</ion-card>		\n			</ion-col>	\n		</ion-row>	\n	</ion-grid>\n\n	<h3 *ngIf="earnings.daily_earnings?.length" style="color:white; padding-left: 10px">Daily Earnings</h3>\n	<ion-card  *ngIf="earnings.daily_earnings?.length" class="daily">\n		<ion-card-content>\n			<ion-list>\n			  <ion-item *ngFor="let data of earnings.daily_earnings">\n			    <ion-icon name="cash" class="icon-md-primary" item-start></ion-icon>\n			      {{data.date | date}}\n			    <h2 item-end>{{data.amount | currency : "₹"}}</h2>\n			  </ion-item>\n			</ion-list>\n		</ion-card-content>\n	</ion-card>		\n\n</ion-content>	'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\earnings\earnings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], EarningsPage);
    return EarningsPage;
}());

//# sourceMappingURL=earnings.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_product_add_product__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductDetailPage = /** @class */ (function () {
    function ProductDetailPage(navCtrl, toastController, alertCtrl, storage, actionsheet, http, navParams) {
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.actionsheet = actionsheet;
        this.http = http;
        this.navParams = navParams;
        this.showLoader = false;
        this.user = {};
        this.unit_obj = {};
    }
    ProductDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ProductDetailPage');
        this.storage.get('cuserinfo').then(function (result) {
            _this.user = JSON.parse(result);
        });
        __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["b" /* UNIT_LIST */].forEach(function (element) {
            _this.unit_obj[element.value] = element.name;
        });
        this.product_detail = this.navParams.get('product');
    };
    ProductDetailPage.prototype.askDeleteConfirmation = function (item, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Product',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        console.log('Buy clicked');
                        _this.deleteProduct();
                    }
                }
            ]
        });
        alert.present();
    };
    ProductDetailPage.prototype.editProduct = function (item) {
        console.log('item is ', item);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__add_product_add_product__["a" /* AddProductPage */], { product: this.product_detail });
    };
    ProductDetailPage.prototype.deleteProduct = function () {
        var _this = this;
        this.showLoader = true;
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + "products/del-product?key=" + this.user.token + "&id=" + this.product_detail.product_id, {})
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                if (response.error == 0) {
                    var toast = _this.toastController.create({
                        message: "Product deleted successfully.",
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    var toast = _this.toastController.create({
                        message: response.message,
                        duration: 2000,
                        cssClass: 'toast-danger',
                        position: 'top'
                    });
                    toast.present();
                }
                console.log('response is ', response);
            },
            error: function (err) {
                _this.showLoader = false;
                var toast = _this.toastController.create({
                    message: "Something went wrong.",
                    duration: 2000,
                    cssClass: 'toast-danger',
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    ProductDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-detail',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\product-detail\product-detail.html"*/'<!--\n  Generated template for the ProductDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="bg-color">\n\n  <ion-navbar>\n    <ion-title>Product Detail</ion-title>\n    <ion-buttons end>\n      <button (click)="editProduct()" ion-button icon-only>\n        <ion-icon name="create" style="color: white"></ion-icon>\n      </button>\n      <button (click)="askDeleteConfirmation()" ion-button icon-only>\n        <ion-icon name="trash" style="color: white"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="bg-color">\n  <div *ngIf="showLoader" class="loader-bg">\n    <ion-spinner class="spinner" color="light"></ion-spinner>\n</div>\n<ion-row>\n  <div class="prod-det-img">\n    <img src="./../../assets/imgs/avatar.png" />\n  </div>\n  \n</ion-row>\n<ion-row padding>\n  <ion-col>\n    <h4>Name</h4>\n    <p>{{product_detail?.product_name}}</p>\n  </ion-col>\n  <ion-col>\n    <h4>Sale Price</h4>\n    <p>{{product_detail?.sale_price}}</p>\n  </ion-col>\n</ion-row>\n<ion-row padding>\n  <ion-col>\n    <h4>MRP</h4>\n    <p>{{product_detail?.mrp}}</p>\n  </ion-col>\n  <ion-col>\n    <h4>Discount</h4>\n    <p>{{product_detail?.discount || 0}}</p>\n  </ion-col>\n</ion-row>\n<ion-row padding no-margin>\n  <ion-col>\n    <h4>Unit</h4>\n    <p>{{unit_obj[product_detail?.unit] || \'-\'}}</p>\n  </ion-col>\n  <ion-col>\n    <h4>unit Value</h4>\n    <p>{{product_detail?.unit_value }}</p>\n  </ion-col>\n</ion-row>\n<ion-row padding >\n  <ion-col>\n    <h4>Description</h4>\n    <p>{{product_detail?.description}}</p>\n  </ion-col>\n</ion-row>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\product-detail\product-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ProductDetailPage);
    return ProductDetailPage;
}());

//# sourceMappingURL=product-detail.js.map

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UNIT_LIST; });
var APIURL = 'https://everythingservices.in/admin14/sapi/v1/';
var UNIT_LIST = [
    {
        value: 'kg',
        name: 'Kg'
    },
    {
        value: 'litr',
        name: 'Litre'
    },
    {
        value: 'nos',
        name: 'Number'
    },
    {
        value: 'gram',
        name: 'Gram'
    },
    {
        value: 'peice',
        name: 'Piece'
    },
    {
        value: 'ml',
        name: 'Mili Litrre'
    },
    {
        value: 'bundle',
        name: 'Bundle'
    },
    {
        value: 'packet',
        name: 'Packet'
    },
    {
        value: 'pack',
        name: 'Pack'
    },
    {
        value: 'roll',
        name: 'Roll'
    },
    {
        value: 'box',
        name: 'Box'
    },
];
//# sourceMappingURL=apiconfig.js.map

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-product/add-product.module": [
		443,
		5
	],
	"../pages/change-password/change-password.module": [
		438,
		4
	],
	"../pages/earnings/earnings.module": [
		439,
		3
	],
	"../pages/picker/picker.module": [
		440,
		2
	],
	"../pages/product-detail/product-detail.module": [
		441,
		1
	],
	"../pages/product-list/product-list.module": [
		442,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 196;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__appointment_status_appointment_status__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__my_profile_my_profile__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__popover_popover__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__product_list_product_list__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Geolocation } from '@ionic-native/geolocation';







var AppointmentsPage = /** @class */ (function () {
    function AppointmentsPage(locationAccuracy, toastController, diagnostic, navCtrl, popoverController, platform, backgroundGeolocation, storage, http) {
        this.locationAccuracy = locationAccuracy;
        this.toastController = toastController;
        this.diagnostic = diagnostic;
        this.navCtrl = navCtrl;
        this.popoverController = popoverController;
        this.platform = platform;
        this.backgroundGeolocation = backgroundGeolocation;
        this.storage = storage;
        this.http = http;
        this.appointments_tab = "upcoming";
        this.showLoader = false;
        this.approved = null;
        this.pancard = '';
        this.orders = [];
        this.orderStack = [];
        this.user = {};
        this.showfee = false;
        this.filterVal = 'All';
    }
    AppointmentsPage.prototype.goToProduct = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__product_list_product_list__["a" /* ProductListPage */]);
    };
    AppointmentsPage.prototype.onViewDidEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                _this.diagnostic.isLocationEnabled()
                    .then(function (available) {
                    if (!available) {
                        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                    }
                }).catch(function (error) {
                    alert("The following error occurred: " + error);
                });
                //setting up notification on receive
                _this.firebasePlugin = window.FirebasePlugin;
                _this.firebasePlugin.onMessageReceived(_this.onMessageReceived.bind(_this));
            }
        });
    };
    AppointmentsPage.prototype.onMessageReceived = function (message) {
        if (message.tap) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__appointment_status_appointment_status__["a" /* Appointment_statusPage */], { id: message.order_id });
        }
        else {
            //received while app in foreground (show a toast)
            var toast = this.toastController.create({
                message: message.body,
                duration: 5000,
                position: 'top',
                cssClass: 'toast-info'
            });
            toast.present();
            //reload current view
            var view = this.navCtrl.getActive();
            if (view.component.name == 'AppointmentsPage') {
                this.loadAppointments();
            }
        }
    };
    AppointmentsPage.prototype.startWatch = function () {
        var _this = this;
        var config = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            interval: 120000,
            fastestInterval: 60000,
            activitiesInterval: 60000,
            debug: false,
            stopOnTerminate: true,
        };
        this.backgroundGeolocation.configure(config)
            .then(function () {
            _this.backgroundGeolocation.on(__WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__["b" /* BackgroundGeolocationEvents */].location).subscribe(function (location) {
                if (typeof location != 'undefined') {
                    var coords = { lat: location.latitude, lng: location.longitude };
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + _this.user.id + '?access-token=' + _this.user.token, coords)
                        .subscribe({
                        next: function (data) {
                        },
                        error: function (error) {
                        }
                    });
                }
                // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
                // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                //this.backgroundGeolocation.finish(); // FOR IOS ONLY
            });
        });
        this.backgroundGeolocation.checkStatus().then(function (status) {
            if (!status.isRunning) {
                _this.backgroundGeolocation.start(); //triggers start on start event
            }
        });
        // start recording location
        this.backgroundGeolocation.start();
        // If you wish to turn OFF background-tracking, call the #stop method.
        //this.backgroundGeolocation.stop();
    };
    AppointmentsPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
            //check this approval status in order api, no need to separately hit this.
            _this.loadAppointments();
            //getting unpaid services
            _this.http.get(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/unpaid-services?access-token=' + _this.user.token)
                .subscribe({
                next: function (data) {
                    _this.showLoader = false;
                    if (data.cnt > 0) {
                        _this.showfee = true;
                    }
                },
                error: function (error) {
                    console.error('There was an error!', error);
                }
            });
        });
    };
    AppointmentsPage.prototype.loadAppointments = function () {
        var _this = this;
        this.showLoader = true;
        this.http.get(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'orders?access-token=' + this.user.token + '&where[sp_id]=' + this.user.id)
            .subscribe({
            next: function (data) {
                _this.showLoader = false;
                _this.approved = data.approved;
                _this.pancard = data.pancard;
                _this.orders = data.orders;
                _this.orderStack = data.orders;
                if (data.online == 1 && data.is_automobile > 0 && _this.platform.is('cordova')) {
                    _this.startWatch();
                }
            },
            error: function (error) {
                console.error('There was an error!', error);
            }
        });
    };
    AppointmentsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.loadAppointments();
        var interval = setInterval(function () {
            if (_this.showLoader == false) {
                refresher.complete();
                clearInterval(interval);
            }
        }, 1000);
    };
    AppointmentsPage.prototype.filterOrders = function (type) {
        if (typeof this.orders != 'undefined') {
            if (type == 'Past') {
                return this.orders.filter(function (x) { return x.status == 'Complete' || x.status == 'Rejected' || x.status == 'Cancelled'; });
            }
            else {
                return this.orders.filter(function (x) { return x.status != 'Complete' && x.status != 'Rejected' && x.status != 'Cancelled'; });
            }
        }
        else {
            return [];
        }
    };
    AppointmentsPage.prototype.openPopover = function (ev) {
        var _this = this;
        var popover = this.popoverController.create(__WEBPACK_IMPORTED_MODULE_10__popover_popover__["a" /* PopoverPage */], { filter: this.filterVal });
        popover.onDidDismiss(function (data) {
            if (data) {
                _this.filterVal = data.value;
                if (data.value == 'All') {
                    _this.orders = _this.orderStack;
                }
                else {
                    _this.orders = _this.orderStack.filter(function (x) { return x.status == _this.filterVal; });
                }
            }
        });
        popover.present({
            ev: ev
        });
    };
    AppointmentsPage.prototype.openPay = function () {
        window.open("https://everythingservices.in/pay-fee/" + this.user.id, '_system', 'location=yes');
    };
    AppointmentsPage.prototype.appointment_status = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__appointment_status_appointment_status__["a" /* Appointment_statusPage */], { id: id });
    };
    AppointmentsPage.prototype.my_profile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__my_profile_my_profile__["a" /* My_profilePage */]);
    };
    AppointmentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-appointments',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\appointments\appointments.html"*/'<ion-header class="bg-color">\n    <ion-navbar>\n        <ion-title>{{\'appointments\' | translate}}</ion-title>\n        <ion-buttons *ngIf="approved == 1" end>\n          <button (click)="openPopover($event)" ion-button icon-only>\n            <ion-icon name="funnel" style="color: white"></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>\n    <ion-list *ngIf="showfee == true">\n        <ion-item>\n          <p>You have pending unpaid registered services. <a href=\'#\' (click)="openPay()">PAY NOW</a></p>\n        </ion-item>\n    </ion-list>\n    <ion-segment *ngIf="approved == 1" [(ngModel)]="appointments_tab">\n        <ion-segment-button value="upcoming">\n            {{\'upcoming\' | translate}}\n        </ion-segment-button>\n        <ion-segment-button value="past">\n            {{\'past\' | translate}}\n        </ion-segment-button>\n    </ion-segment>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n            pullingIcon="arrow-dropdown"\n            pullingText="Pull to refresh"\n            refreshingSpinner="bubbles"\n        ></ion-refresher-content>\n    </ion-refresher>\n\n    <div class="tab_container" *ngIf="approved == 1" [ngSwitch]="appointments_tab">\n        <ion-list no-lines *ngSwitchCase="\'upcoming\'">\n            <ion-item *ngFor="let item of filterOrders(\'Pending\')" (click)="appointment_status(item.id)" class="{{item.status | lowercase}} item item-block item-md">\n                <div class="img_box center_img" item-start>\n                    <img src="{{item.customers.profilepic}}" class="crop_img">\n                </div>\n                <h2 class="d-flex"><span>{{item.customers.name}}</span>\n                    <span class="end">{{item.status == \'Pending\' ? \'New Job\' : item.status | translate}}</span>\n                </h2>\n                <h3 class="d-flex"><span class="start">{{item.subcategory}}</span> <span style="white-space: normal; text-align: right" class="end">{{item.status == \'Scheduled\' ? (item.service_schedule | date : "dd MMM, yyyy") : (item.created_at | date : "dd MMM, yyyy")}}</span></h3>\n                <p>{{item.requirement}}</p>\n            </ion-item>\n\n            <div *ngIf="filterOrders(\'Pending\').length == 0" class="emptydata" align="center">\n                <img src="assets/imgs/nodata.png" style="max-height: 150px" />\n                <h4>Awaiting new appointments.</h4>\n            </div>\n        </ion-list>\n\n        <ion-list no-lines *ngSwitchCase="\'past\'">\n            <ion-item *ngFor="let item of filterOrders(\'Past\')" (click)="appointment_status(item.id)" class="{{item.status == \'Complete\' && item.is_paid == 0 ? \'rejected\' : item.status | lowercase}} item item-block item-md">\n                <div class="img_box center_img" item-start>\n                    <img src="{{item.customers.profilepic}}" class="crop_img">\n                </div>\n                <h2 class="d-flex"><span>{{item.customers.name}}</span>\n                    <span class="end">{{item.status == \'Complete\' && item.is_paid == 0 ? \'Payment Pending\' : item.status}}</span>\n                </h2>\n                <h3 class="d-flex"><span class="start">{{item.subcategory}}</span> <span class="end">{{item.created_at | date}}</span></h3>\n                <p>{{item.requirement}}</p>\n            </ion-item>\n\n            <div *ngIf="filterOrders(\'Past\').length == 0" class="emptydata" align="center">\n                <ion-icon name="close-circle" class="icon-md-primary" style="zoom:8.0;"></ion-icon>\n                <h4>No data found.</h4>\n            </div>\n        </ion-list>\n\n    </div>\n\n    <div align="center" style="width: 100%; position: absolute; top: 45%; padding: 0 20px; transform: translateY(-50%);" *ngIf="approved == 0">\n        <div *ngIf="!pancard">\n            <h5 class="text-md-light">You will not be able to receive orders until you submit relevant documents.</h5>\n            <button ion-button (click)="my_profile()">Complete KYC</button>\n        </div>\n        <div *ngIf="pancard">\n            <img src="assets/imgs/wait.jpg" style="border-radius: 50%; width: 200px" />\n            <h5 class="text-md-light">Your documents are under review.</h5>\n        </div>    \n    </div>    \n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\appointments\appointments.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__["a" /* LocationAccuracy */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], AppointmentsPage);
    return AppointmentsPage;
}());

//# sourceMappingURL=appointments.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Appointment_statusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_gallery_modal__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Appointment_statusPage = /** @class */ (function () {
    function Appointment_statusPage(navCtrl, platform, datePipe, modalCtrl, alertCtrl, toast, storage, navparams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.datePipe = datePipe;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toast = toast;
        this.storage = storage;
        this.navparams = navparams;
        this.http = http;
        this.showLoader = true;
        this.order = {};
        this.customer = {};
        this.subcat = {};
        this.user = {};
        this.status_img = 'assets/imgs/ic_exp_pending_req.png';
        platform.ready().then(function () {
            if (platform.is('cordova')) {
                //setting up notification on receive
                _this.firebasePlugin = window.FirebasePlugin;
                _this.firebasePlugin.onMessageReceived(_this.onMessageReceived.bind(_this));
            }
        });
    }
    Appointment_statusPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
            _this.loadAppointment();
        });
    };
    Appointment_statusPage.prototype.loadAppointment = function () {
        var _this = this;
        var id = this.navparams.get('id');
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'orders/' + id + '?access-token=' + this.user.token)
            .subscribe({
            next: function (data) {
                _this.showLoader = false;
                _this.order = data;
                _this.subcat = data.subcategory;
                _this.customer = data.customer;
                _this.getImages();
            },
            error: function (error) {
                console.error('There was an error!', error);
            }
        });
    };
    Appointment_statusPage.prototype.onMessageReceived = function (message) {
        if (message.tap) {
            //do nothing
        }
        else {
            //received while app in foreground (show a toast)
            //reload current view
            var view = this.navCtrl.getActive();
            var id = this.navparams.get('id');
            if (view.component.name == 'Appointment_statusPage' && id == message.order_id) {
                this.loadAppointment();
            }
        }
    };
    Appointment_statusPage.prototype.openPopup = function (index) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5_ionic_gallery_modal__["a" /* GalleryModal */], {
            photos: [{ type: 'image', url: this.order.image[index] }],
            initialSlide: 0
        });
        modal.present();
    };
    Appointment_statusPage.prototype.getImages = function () {
        switch (this.order.status) {
            case 'Pending':
                this.status_img = 'assets/imgs/ic_exp_pending_req.png';
                break;
            case 'Quoted':
                this.status_img = 'assets/imgs/ic_exp_in_process.png';
                break;
            case 'Accepted':
            case 'Scheduled':
                if (this.order.quotation_approved == 'Y')
                    this.status_img = 'assets/imgs/ic_exp_accepted.png';
                else
                    this.status_img = 'assets/imgs/ic_exp_pending_req.png';
                break;
            case 'Complete':
                this.status_img = 'assets/imgs/ic_exp_finished.png';
                break;
            default:
                this.status_img = 'assets/imgs/ic_exp_pending_req.png';
                break;
        }
    };
    Appointment_statusPage.prototype.takeOrderNote = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Order Comment',
            cssClass: 'quotation',
            inputs: [
                {
                    name: 'note',
                    placeholder: 'Did you face any issues for this order?'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        if (data.note.trim() == '' || data.length < 10) {
                            var toast = _this.toast.create({
                                message: 'Please enter valid Comment. It should be minimum 10 characters.',
                                duration: 3000,
                                cssClass: 'toast-danger',
                                position: 'top'
                            });
                            toast.present();
                            return false;
                        }
                        else {
                            _this.submitNote(data.note.trim());
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    Appointment_statusPage.prototype.submitNote = function (comment) {
        var _this = this;
        this.showLoader = true;
        var order_id = this.navparams.get('id');
        var d = new Date();
        var data = { order_id: order_id, comment: comment, created_at: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(), note_from: 'Service Provider', from_id: this.user.id };
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        //sending api request
        this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'order-notes?access-token=' + this.user.token, formData)
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                var alert = _this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Your Comment has been submitted successfully. We will call you incase we need your assistance.',
                    buttons: ['OK']
                });
                alert.present();
            },
            error: function (err) {
                _this.showLoader = false;
                console.error(err);
            }
        });
    };
    Appointment_statusPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Quotation',
            cssClass: 'quotation',
            inputs: [
                {
                    name: 'quote',
                    placeholder: 'Please enter amount.'
                },
                {
                    name: 'quotation_note',
                    placeholder: 'Note (if any).'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        if (isNaN(data.quote) || data.quote.trim() == '') {
                            var toast = _this.toast.create({
                                message: 'Please enter valid Amount.',
                                duration: 3000,
                                cssClass: 'toast-danger',
                                position: 'top'
                            });
                            toast.present();
                            return false;
                        }
                        else if (data.quote.toString().length > 7) {
                            var toast = _this.toast.create({
                                message: 'Quotation amount cannot be greater than 7 digit.',
                                duration: 3000,
                                cssClass: 'toast-danger',
                                position: 'top'
                            });
                            toast.present();
                            return false;
                        }
                        else {
                            _this.submitQuote(data.quote.trim(), data.quotation_note.trim());
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    Appointment_statusPage.prototype.submitQuote = function (amt, note) {
        var _this = this;
        this.showLoader = true;
        var order_id = this.navparams.get('id');
        var d = new Date();
        var data = { id: order_id, quotation_date: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(), quotation: amt, quotation_note: note, status: 'Quoted' };
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        //sending api request
        this.http.put(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'orders/' + order_id + '?access-token=' + this.user.token, formData)
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                if (response.error == 1) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: response.msg,
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                else {
                    _this.order.status = 'Quoted';
                    _this.order.quotation = amt;
                    _this.order.quotation_note = note;
                    _this.order.quotation_date = new Date().getTime();
                    _this.getImages();
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Your Quotation has been sent successfully. You will be notified once customer reacts on it.',
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
            },
            error: function (err) {
                _this.showLoader = false;
                console.error(err);
            }
        });
    };
    Appointment_statusPage.prototype.presentFinish = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Finish Job',
            subTitle: 'Are you sure, the job is complete?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'YES',
                    handler: function (data) {
                        var date = new Date();
                        var d = _this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
                        _this.http.put(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + "orders/" + _this.order.id + "?access-token=" + _this.user.token, { 'status': 'Complete', 'completion_date': d })
                            .subscribe({
                            next: function (response) {
                                var toast = _this.toast.create({
                                    message: 'Job finished successfully.',
                                    duration: 3000,
                                    cssClass: 'toast-success',
                                    position: 'top'
                                });
                                toast.present();
                                setTimeout(function () { return _this.navCtrl.pop(); }, 2000);
                            },
                            error: function (err) {
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    Appointment_statusPage.prototype.onImageLoad = function (e) {
        e.classList.add('visible');
        e.classList.remove('invisible');
    };
    Appointment_statusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-appointment_status',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\appointment_status\appointment_status.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title><span>{{\'job_status\' | translate}}</span></ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div> \n    <div class="job_status">\n        <ion-row>\n            <ion-col col-7>\n                <div class="status d-flex active">\n                    <h2>1</h2>\n                    <div class="status_details">\n                        <h3>{{\'pending\' | translate}}</h3>\n                        <p>{{order.created_at | date:\'MMM d, y, h:mm a\'}}</p>\n                    </div>\n                </div>\n                <div class="status d-flex {{[\'Quoted\',\'Scheduled\',\'Complete\'].indexOf(order.status) != -1  ? \'active\' : \'\'}}">\n                    <h2>2</h2>\n                    <div class="status_details">\n                        <h3>Quoted</h3>\n                        <p>{{order.quotation_date != null ? (order.quotation_date | date:\'MMM d, y, h:mm a\') : \'-\'}}</p>\n                    </div>\n                </div>\n                <div class="status d-flex {{order.quotation_approved == \'N\' ? \'bg-danger\' : \'\'}} {{[\'Accepted\',\'Complete\',\'Scheduled\'].indexOf(order.status) != -1  ? \'active\' : \'\'}}">\n                    <h2>3</h2>\n                    <div class="status_details">\n                        <h3>{{order.quotation_approved == \'Y\' ? \'Scheduled\' : (order.quotation_approved == null) ? \'Scheduled / Rejected\' : \'Rejected\'}}</h3>\n                        <p>{{order.service_schedule != null ? (order.service_schedule | date:\'MMM d, y, h:mm a\') : \'-\'}}</p>\n                    </div>\n                </div>\n                <div class="status d-flex {{\'Complete\' == order.status ? \'active\' : \'\'}}">\n                    <h2>4</h2>\n                    <div class="status_details">\n                        <h3>{{\'finished\' | translate}}</h3>\n                        <p>{{order.completion_date != null ? (order.completion_date | date:\'MMM d, y, h:mm a\') : \'-\'}}</p>\n                    </div>\n                </div>\n            </ion-col>\n            <ion-col col-5>\n                <div class="img_box center_img">\n                    <img src="{{status_img}}" class="crop_img">\n                </div>\n                <div class="">\n                    <!-- <button ion-button block icon-only class="btn">\n                        <ion-icon class="material-icons">thumb_down</ion-icon>\n                    </button> -->\n                    <button *ngIf="order.status == \'Pending\'" (click)="presentPrompt()" ion-button block class="btn">SEND QUOTATION</button>\n                    \n                    <a class="btn" button ion-button icon-start href="tel:{{customer.contact}}" *ngIf="order.status == \'Scheduled\' && order.quotation_approved == \'Y\'"><ion-icon name="call"></ion-icon> CUSTOMER</a>\n\n                    <a *ngIf="order.status != \'Complete\'" class="btn" button ion-button icon-start href="tel:+91 864 209 3333"><ion-icon name="call"></ion-icon> HELPLINE</a>\n\n                    <button style="margin-top: 10px" *ngIf="order.status == \'Scheduled\'" icon-start (click)="presentFinish()" ion-button block class="btn"><ion-icon name="checkmark"></ion-icon> FINISH JOB</button>\n\n                </div>\n            </ion-col>\n        </ion-row>\n    </div>\n\n    <div class="appointment_details">\n        <ion-list no-lines>\n            <ion-item>\n                <div class="img_box center_img" item-start>\n                    <img src="{{customer.profile_picture}}" class="crop_img invisible" (load)="onImageLoad($event.target)">\n                </div>\n                <h2 class="d-flex">{{customer.name}}</h2>\n                <div class="text-box">\n                    <h3>{{\'job_task\' | translate}}</h3>\n                    <h4>{{subcat.name}}</h4>\n                </div>\n                <ion-row>\n                    <ion-col col-6>\n                        <div class="text-box">\n                            <h3>{{\'job_date\' | translate}}</h3>\n                            <h4>{{order.created_at | date:\'MMM d, y, h:mm a\'}}</h4>\n                        </div>\n                    </ion-col>\n                    <ion-col col-6 *ngIf="[\'Quoted\',\'Accepted\',\'Complete\'].indexOf(order.status) != -1">\n                        <div class="text-box">\n                            <h3>{{\'job_cost\' | translate}}</h3>\n                            <h4>{{\'₹\'+order.quotation}}</h4>\n                        </div>\n                    </ion-col>\n                </ion-row>\n                <div *ngIf="order.quotation_note" class="text-box">\n                    <h3>Quotation Note</h3>\n                    <h4>{{order.quotation_note}}</h4>\n                </div>\n                <div class="text-box">\n                    <h3>Job Details</h3>\n                    <h4>{{order.requirement}}</h4>\n                </div>\n                <div class="text-box" *ngIf="(order.status == \'Accepted\' || order.status == \'Scheduled\') && order.quotation_approved == \'Y\'">\n                    <h3>Address</h3>\n                    <h4>{{order.service_address}}</h4>\n                </div>\n                <!-- <div class="text-box" *ngIf="(order.status == \'Accepted\' || order.status == \'Scheduled\') && order.quotation_approved == \'Y\'">\n                    <h3>Contact Number</h3>\n                    <h4><a href="tel:{{customer.contact}}">{{customer.contact}}</a></h4>\n                </div> -->\n                <div class="text-box" *ngIf="(order.status == \'Accepted\' || order.status == \'Scheduled\') && order.quotation_approved == \'Y\'">\n                    <h3>Service Schedule</h3>\n                    <h4>{{order.service_schedule | date : "MMM d, y, h:mm a"}}</h4>\n                </div>\n            </ion-item>\n        </ion-list>\n\n        <ion-grid *ngIf="order.image != null">\n          <ion-row>\n            <ion-col col-4 *ngFor="let img of order.image;let indexOfelement=index;">\n                <div class="imgBg">    \n                    <img src="{{img}}" class="invisible" (load)="onImageLoad($event.target)"  (click)="openPopup(indexOfelement)" />\n                </div>    \n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n        <div style="margin: 20px 10px 0 10px" *ngIf="(order.status == \'Accepted\' || order.status == \'Scheduled\') && order.quotation_approved == \'Y\'">\n            <a block button ion-button icon-start href="tel:{{customer.contact}}"><ion-icon name="call"></ion-icon> CALL CUSTOMER</a>\n        </div>\n\n        <div style="margin: 20px 10px 0 10px" *ngIf="order.status == \'Complete\'">\n            <button (click)="takeOrderNote()" block ion-button class="button-wp-danger" icon-start><ion-icon name="alert"></ion-icon> LEAVE COMMENT</button>\n        </div>\n\n        <br/><br/>\n\n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\appointment_status\appointment_status.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], Appointment_statusPage);
    return Appointment_statusPage;
}());

//# sourceMappingURL=appointment_status.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationSelect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationSelect = /** @class */ (function () {
    function LocationSelect(navCtrl, locationAccuracy, zone, geolocation) {
        this.navCtrl = navCtrl;
        this.locationAccuracy = locationAccuracy;
        this.zone = zone;
        this.geolocation = geolocation;
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.markers = [];
        this.geocoder = {};
        this.GoogleAutocomplete = {};
        this.autocomplete = { input: '', lat: '', lng: '' };
        this.autocompleteItems = [];
        this.map = {};
        this.mapsScriptUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCafBAru90axG3nmROSa_5A7__k_0wChpc&v=3.exp&libraries=places';
    }
    LocationSelect.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
                    .then(function () { return _this.tryGeolocation(_this); }, function (error) { return _this.tryGeolocation(_this); });
            }
        });
    };
    LocationSelect.prototype.ionViewDidEnter = function () {
        this.geocoder = new google.maps.Geocoder;
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        //Set latitude and longitude of some place
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 19.076090, lng: 72.877426 },
            zoom: 15
        });
    };
    LocationSelect.prototype.searchPlace = function () {
        var _this = this;
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, function (predictions, status) {
            _this.autocompleteItems = [];
            _this.zone.run(function () {
                if (predictions != null) {
                    predictions.forEach(function (prediction) {
                        _this.autocompleteItems.push(prediction);
                    });
                }
                else {
                    _this.autocompleteItems = [];
                }
            });
        });
    };
    LocationSelect.prototype.tryGeolocation = function (that) {
        this.geolocation.getCurrentPosition().then(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: that.map,
                title: 'I am here!'
            });
            that.markers = [];
            that.markers.push(marker);
            that.map.setCenter(pos);
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    LocationSelect.prototype.selectPlace = function (item) {
        var _this = this;
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                _this.autocomplete.lat = results[0].geometry.location.lat();
                _this.autocomplete.lng = results[0].geometry.location.lng();
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: _this.map,
                });
                _this.markers = [];
                _this.markers.push(marker);
                _this.map.setCenter(results[0].geometry.location);
                _this.saveDisabled = false;
                console.log(_this.autocomplete);
            }
            else {
                alert('Some error, Please try again!');
            }
        });
    };
    LocationSelect.prototype.close = function () {
        this.navCtrl.pop();
    };
    LocationSelect.prototype.goBackWithCoords = function () {
        this.navCtrl.getPrevious().data.lat = this.autocomplete.lat;
        this.navCtrl.getPrevious().data.lng = this.autocomplete.lng;
        this.navCtrl.getPrevious().data.address = this.autocomplete.input;
        this.navCtrl.pop();
    };
    LocationSelect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-location-select',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\location-select\location-select.html"*/'<ion-header>\n    <ion-navbar color="dark">\n        <ion-buttons left>\n            <button ion-button (click)="close()">Cancel</button>\n        </ion-buttons>\n        <ion-buttons right>\n            <button [disabled]="saveDisabled" ion-button (click)="goBackWithCoords()">Save</button>\n        </ion-buttons>\n    </ion-navbar>\n\n    <ion-toolbar>\n        <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="searchPlace()" placeholder="Enter your address"></ion-searchbar>\n    </ion-toolbar>\n\n    <ion-list [hidden]="autocompleteItems.length == 0">\n        <ion-item *ngFor="let place of autocompleteItems" (touchstart)="selectPlace(place)">{{place.description}}</ion-item>\n    </ion-list>\n\n</ion-header>\n\n<ion-content>\n\n    <div #map id="map">\n        <ion-spinner></ion-spinner>\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\location-select\location-select.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__["a" /* LocationAccuracy */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], LocationSelect);
    return LocationSelect;
}());

//# sourceMappingURL=location-select.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopoverPage = /** @class */ (function () {
    function PopoverPage(navCtrl, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.filter = '';
        this.filter = navParams.get('filter');
    }
    PopoverPage.prototype.handleInput = function () {
        var _this = this;
        if (this.filter != '') {
            setTimeout(function () { return _this.viewCtrl.dismiss({ value: _this.filter }); }, 500);
        }
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popover',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\popover\popover.html"*/'<ion-list radio-group [(ngModel)]="filter">\n  <ion-list-header>\n    FILTER BY STATUS\n  </ion-list-header>\n\n  <ion-item>\n    <ion-label>New Job</ion-label>\n    <ion-radio (click)="handleInput(\'Pending\')" value="Pending"></ion-radio>\n  </ion-item>\n  <ion-item>\n    <ion-label>Quoted</ion-label>\n    <ion-radio (click)="handleInput(\'Quoted\')" value="Quoted"></ion-radio>\n  </ion-item>\n  <ion-item>\n    <ion-label>Scheduled</ion-label>\n    <ion-radio (click)="handleInput(\'Scheduled\')" value="Scheduled"></ion-radio>\n  </ion-item>\n  <ion-item>\n    <ion-label>Cancelled</ion-label>\n    <ion-radio (click)="handleInput(\'Cancelled\')" value="Cancelled"></ion-radio>\n  </ion-item>\n  <ion-item>\n    <ion-label>Rejected</ion-label>\n    <ion-radio (click)="handleInput(\'Rejected\')" value="Rejected"></ion-radio>\n  </ion-item>\n  <ion-item>\n    <ion-label>Complete</ion-label>\n    <ion-radio (click)="handleInput(\'Complete\')" value="Complete"></ion-radio>\n  </ion-item>\n  <ion-item>\n    <ion-label>All</ion-label>\n    <ion-radio (click)="handleInput(\'All\')" value="All"></ion-radio>\n  </ion-item>\n</ion-list>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\popover\popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], PopoverPage);
    return PopoverPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationPage = /** @class */ (function () {
    function NotificationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\notification\notification.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'notifications\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <ion-list no-lines>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n        <ion-item>\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2 class="d-flex">Founds a plumber you may searching for you Work.</h2>\n            <h3>2 mins ago</h3>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\notification\notification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__all_reviews_all_reviews__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RatingsPage = /** @class */ (function () {
    function RatingsPage(navCtrl, platform, http, storage) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.http = http;
        this.storage = storage;
        this.data = [];
        this.showLoader = false;
        this.ratings = [];
    }
    RatingsPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.showLoader = true;
        this.storage.get('userinfo').then(function (result) {
            var user = JSON.parse(result);
            _this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'reviews/ratings?access-token=' + user.token).subscribe({
                next: function (response) {
                    _this.data = response;
                    _this.ratings = response.ratings.reverse();
                    _this.showLoader = false;
                },
                error: function (err) {
                    console.error(err);
                }
            });
        });
    };
    RatingsPage.prototype.all_reviews = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__all_reviews_all_reviews__["a" /* All_reviewsPage */]);
    };
    RatingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ratings',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\ratings\ratings.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'your_current_ratings\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <div class="banner" text-center>\n        <h1>{{data.average != null ? data.average : \'N/A\'}} <ion-icon class="material-icons">star</ion-icon>\n        </h1>\n        <h2>Average Rating by {{data.count}} {{\'people\' | translate}}</h2>\n    </div>\n    <div class="rating_box">\n        <div class="rating d-flex" *ngFor="let item of ratings">\n            <p class="rating-num d-flex ">{{item.rating}} <ion-icon name="md-star" class="end"></ion-icon>\n            </p>\n            <div class="rating_scale">\n                <div class="rating_scale_active" [ngStyle]="{\'width\': data.count > 0 ? ((item.cnt/data.count)*100)+\'%\' : \'0%\'}">\n                </div>\n            </div>\n            <p>{{item.cnt}}</p>\n        </div>\n    </div>\n\n    <ion-list *ngIf="data.reviews != \'\'" no-lines>\n        <h2 class="d-flex">{{\'recent_ratings\' | translate}} <span class="end" (click)="all_reviews()">{{\'read_all\' | translate}}</span></h2>\n        <ion-item *ngFor="let item of data.reviews">\n            <div class="img_box center_img" item-start>\n                <img src="{{item.customer.profilepic}}" class="crop_img">\n            </div>\n            <h2 class="d-flex"><span>{{item.customer.name}}</span>\n                <ion-badge class="end">{{item.rating}} <ion-icon class="material-icons">star</ion-icon>\n                </ion-badge>\n            </h2>\n            <h3>{{item.subcategory}} | {{item.created_at}}</h3>\n            <p>{{item.comment}}</p>\n        </ion-item>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\ratings\ratings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], RatingsPage);
    return RatingsPage;
}());

//# sourceMappingURL=ratings.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return All_reviewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var All_reviewsPage = /** @class */ (function () {
    function All_reviewsPage(navCtrl, storage, http) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        this.data = [];
        this.user = {};
        this.showLoader = true;
    }
    All_reviewsPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
            _this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'reviews/all?access-token=' + _this.user.token).subscribe({
                next: function (response) {
                    _this.showLoader = false;
                    _this.data = response;
                },
                error: function (err) {
                    _this.showLoader = false;
                    console.error(err);
                }
            });
        });
    };
    All_reviewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-all_reviews',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\all_reviews\all_reviews.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'all_reviews\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <ion-list no-lines>\n        <ion-item *ngFor="let item of data.reviews">\n            <div class="img_box center_img" item-start>\n                <img src="{{item.customer.profilepic}}" class="crop_img">\n            </div>\n            <h2 class="d-flex"><span>{{item.customer.name}}</span>\n                <ion-badge class="end">{{item.rating}} <ion-icon class="material-icons">star</ion-icon>\n                </ion-badge>\n            </h2>\n            <h3>{{item.subcategory}} | {{item.created_at}}</h3>\n            <p>{{item.comment}}</p>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\all_reviews\all_reviews.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], All_reviewsPage);
    return All_reviewsPage;
}());

//# sourceMappingURL=all_reviews.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__my_profile_my_profile__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contact_contact__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__about_about__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__faq_faq__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__change_password_change_password__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__signin_signin__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__product_list_product_list__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Geolocation } from '@ionic-native/geolocation';








var AccountPage = /** @class */ (function () {
    function AccountPage(navCtrl, alertCtrl, platform, backgroundGeolocation, http, storage, app) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.backgroundGeolocation = backgroundGeolocation;
        this.http = http;
        this.storage = storage;
        this.app = app;
        this.online = false;
        this.user = {};
        this.showLoader = false;
        this.baseurl = __WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */];
        this.watch = null;
    }
    AccountPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
            _this.http.get(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + _this.user.id + '?access-token=' + _this.user.token).subscribe({
                next: function (response) {
                    _this.user = response;
                    if (_this.user.online == 1) {
                        _this.online = true;
                    }
                    else {
                        _this.online = false;
                    }
                },
                error: function (err) {
                    console.error(err);
                }
            });
        });
    };
    //starting watch while user goes online
    AccountPage.prototype.startWatch = function () {
        var _this = this;
        var config = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            interval: 120000,
            fastestInterval: 60000,
            activitiesInterval: 60000,
            debug: false,
            stopOnTerminate: true,
        };
        this.backgroundGeolocation.configure(config)
            .then(function () {
            _this.backgroundGeolocation.on(__WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__["b" /* BackgroundGeolocationEvents */].location).subscribe(function (location) {
                if (typeof location != 'undefined') {
                    var coords = { lat: location.latitude, lng: location.longitude };
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + _this.user.id + '?access-token=' + _this.user.token, coords)
                        .subscribe({
                        next: function (data) {
                        },
                        error: function (error) {
                        }
                    });
                }
                // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
                // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                //this.backgroundGeolocation.finish(); // FOR IOS ONLY
            });
        });
        this.backgroundGeolocation.checkStatus().then(function (status) {
            if (!status.isRunning) {
                _this.backgroundGeolocation.start(); //triggers start on start event
            }
        });
        // start recording location
        this.backgroundGeolocation.start();
        // If you wish to turn OFF background-tracking, call the #stop method.
        //this.backgroundGeolocation.stop();
    };
    AccountPage.prototype.setOnlineStatus = function () {
        var _this = this;
        var data = new FormData();
        var online = !this.online ? '0' : '1';
        data.append('online', online);
        this.http.put(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + this.user.id + '?access-token=' + this.user.token, data).subscribe({
            next: function (response) {
                if (online == '1' && response.is_automobile == 1 && _this.platform.is('cordova')) {
                    _this.startWatch();
                }
                else {
                    if (_this.platform.is('cordova')) {
                        _this.backgroundGeolocation.checkStatus().then(function (status) {
                            if (status.isRunning) {
                                _this.backgroundGeolocation.stop(); //triggers start on start event
                            }
                        });
                    }
                }
            },
            error: function (err) {
                console.error(err);
            }
        });
    };
    AccountPage.prototype.change_pass = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__change_password_change_password__["a" /* ChangePasswordPage */]);
    };
    AccountPage.prototype.my_product = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__product_list_product_list__["a" /* ProductListPage */]);
    };
    AccountPage.prototype.my_profile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__my_profile_my_profile__["a" /* My_profilePage */]);
    };
    AccountPage.prototype.contact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__contact_contact__["a" /* ContactPage */]);
    };
    AccountPage.prototype.openPrivacy = function () {
        window.open("https://everythingservices.in/privacy", '_system', 'location=yes');
    };
    AccountPage.prototype.about = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__about_about__["a" /* AboutPage */]);
    };
    AccountPage.prototype.faq = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__faq_faq__["a" /* FaqPage */]);
    };
    AccountPage.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.showLoader = true;
                        _this.http.put(__WEBPACK_IMPORTED_MODULE_4__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + _this.user.id + '?access-token=' + _this.user.token, { online: 0, push_token: '' })
                            .subscribe({
                            next: function (response) {
                                _this.showLoader = false;
                                _this.storage.remove('userinfo');
                                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_11__signin_signin__["a" /* SigninPage */]);
                            },
                            error: function (err) {
                                _this.showLoader = false;
                                _this.storage.remove('userinfo');
                                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_11__signin_signin__["a" /* SigninPage */]);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\account\account.html"*/'<ion-header class="bg-img">\n    <ion-navbar>\n        <ion-title>\n            {{\'account\' | translate}}\n        </ion-title>\n    </ion-navbar>\n    <div class="profile d-flex">\n        <div class="profile_img center_img">\n            <img onload="this.classList.remove(\'loading\')" onerror="this.onerror=null;this.src=\'assets/imgs/avatar.png\';" src="{{ user.upload_photo != \'\' ? baseurl+\'../../\'+user.upload_photo : \'assets/imgs/avatar.png\'}}" class="crop_img loading">\n        </div>\n        <div class="profile_details">\n            <h2>{{user.shop_name || user.name}}</h2>\n            <p class="d-flex">+91 {{user.contact}}</p>\n            <ion-item style="background: transparent; padding: 0">\n                <ion-label color="light">{{online ? \'Online\' : \'Offline\'}}</ion-label>\n                <ion-toggle (ionChange)="setOnlineStatus()" [(ngModel)]="online" checked color="success"></ion-toggle>\n            </ion-item>    \n        </div>\n    </div>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>    \n    <ion-list no-lines>\n        <ion-item (click)="my_product()">\n            <ion-icon class="material-icons" item-start>shopping_cart</ion-icon>\n            <h2>My Products</h2>\n        </ion-item>\n        <ion-item (click)="my_profile()">\n            <ion-icon class="material-icons" item-start>account_circle</ion-icon>\n            <h2>My Profile</h2>\n        </ion-item>\n        <ion-item (click)="change_pass()">\n            <ion-icon class="material-icons" item-start>vpn_key</ion-icon>\n            <h2>Change Password</h2>\n        </ion-item>\n        <ion-item (click)="about()">\n            <ion-icon class="material-icons" item-start>assignment_ind</ion-icon>\n            <h2>About Us</h2>\n        </ion-item>\n        <ion-item (click)="contact()">\n            <ion-icon class="material-icons" item-start>email</ion-icon>\n            <h2>Contact Us</h2>\n        </ion-item>\n        <ion-item (click)="openPrivacy()">\n            <ion-icon class="material-icons" item-start>lock</ion-icon>\n            <h2>Privacy Policy</h2>\n        </ion-item>\n        \n        <ion-item (click)="logout()">\n            <ion-icon class="material-icons" item-start>logout</ion-icon>\n            <h2>Logout</h2>\n        </ion-item>\n        <!-- <ion-item (click)="faq()">\n            <ion-icon class="material-icons" item-start>subject</ion-icon>\n            <h2>{{\'faqs_terms\' | translate}}</h2>\n        </ion-item> -->\n\n    </ion-list>\n    <!-- <p align="center" style="color: white">Powered by <a href="#" onclick="window.open(\'https://jacwiz.com\', \'_system\', \'location=yes\');">Jacwiz Software Solutions</a></p> -->\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\account\account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_apiconfig__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContactPage = /** @class */ (function () {
    function ContactPage(storage, http, formBuilder, navCtrl, toastController) {
        this.storage = storage;
        this.http = http;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.user = {};
        this.submitAttempt = false;
        this.showLoader = false;
    }
    ContactPage.prototype.ngOnInit = function () {
        this.buildForm();
    };
    ContactPage.prototype.buildForm = function () {
        this.contactForm = this.formBuilder.group({
            email: [this.user.email],
            message: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(25)
                ])],
        });
    };
    ContactPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('userinfo').then(function (result) {
            _this.user = JSON.parse(result);
        });
    };
    ContactPage.prototype.sendMsg = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.contactForm.get('message').valid) {
            var toast = this.toastController.create({
                message: 'Please enter minimum 25 character message.',
                duration: 3000,
                cssClass: 'toast-danger',
                position: 'top'
            });
            toast.present();
            return false;
        }
        if (this.contactForm.valid) {
            this.showLoader = true;
            var data = this.contactForm.value;
            this.http.post(__WEBPACK_IMPORTED_MODULE_5__app_apiconfig__["a" /* APIURL */] + 'service-providers/enquiry?access-token=' + this.user.token, data)
                .subscribe({
                next: function (data) {
                    _this.submitAttempt = false;
                    _this.showLoader = false;
                    _this.contactForm.get('message').setValue('');
                    var toast = _this.toastController.create({
                        message: 'Message delivered successfully.',
                        duration: 5000,
                        cssClass: 'toast-success',
                        position: 'top'
                    });
                    toast.present();
                },
                error: function (error) {
                    _this.submitAttempt = false;
                    _this.showLoader = false;
                    var toast = _this.toastController.create({
                        message: error.error.msg,
                        duration: 3000,
                        cssClass: 'toast-danger',
                        position: 'top'
                    });
                    toast.present();
                }
            });
        }
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\contact\contact.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n    <div class="text_box">\n        <h2>{{\'contact_us\' | translate}}</h2>\n        <p>{{\'contact_us_text\' | translate}}</p>\n    </div>\n</ion-header>\n\n<ion-content class="bg-img">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <div class="banner form">\n        <ion-list no-lines>\n            <ion-item>\n                <ion-icon class="material-icons" item-start>phone</ion-icon>\n                <p>{{\'call_us\' | translate}}</p>\n                <h2><a href="tel:+91 864 209 3333">+91 864 209 3333</a></h2>\n            </ion-item>\n            <ion-item>\n                <ion-icon class="material-icons" item-start>email</ion-icon>\n                <p>{{\'mail_us\' | translate}}</p>\n                <h2><a href="mailto:support@everythingservices.in">support@everythingservices.in</a></h2>\n            </ion-item>\n        </ion-list>\n    </div>\n    <div class="form">\n        <h1>{{\'or_write_us\' | translate}}</h1>\n        <form [formGroup]="contactForm">\n            <ion-list no-lines>\n                <ion-item>\n                    <ion-icon class="material-icons" item-start>email</ion-icon>\n                    <ion-label floating>{{\'email_address\' | translate}}</ion-label>\n                    <ion-input type="text" formControlName="email" readonly value="{{user.email}}"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-icon class="material-icons" item-start>create</ion-icon>\n                    <ion-label floating>{{\'write_your_message\' | translate}}</ion-label>\n                    <ion-textarea formControlName="message" autosize rows="6"></ion-textarea>\n                </ion-item>\n            </ion-list>\n        </form>    \n    </div>\n</ion-content>\n<ion-footer no-border>\n    <button (click)="sendMsg()" ion-button full no-margin class="btn"> {{\'submit\' | translate}}</button>\n</ion-footer>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\about\about.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            {{\'about_us\' | translate}}\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-img">\n    <div class="banner">\n        <img src="assets/imgs/logo_new.png">\n    </div>\n    <div class="text_box">\n        <h2 style="color: orange">The Biggest Service Provider Company in India</h2>\n        <h6 style="color: #26e18b"><a href="#" onclick="window.open(\'https://everythingservices.in\', \'_system\', \'location=yes\');">EVERYTHING SERVICES PVT. LTD.</a> PROMISE TO CUSTOMER TODAY.</h6>\n        <p>\n            Since, We have a many years business experience in Information Technology about 20 years, Marketing Management about 25 years and Home Service Products about 10 years.\n        </p>\n        <p>\n            Therefore, we want to expand our business in India and in the world. We wants to serve service at home whatever you want, This mission build up, “STAY HOME STAY SAFE” And providing you home services by <b><a href="#" onclick="window.open(\'https://everythingservices.in\', \'_system\', \'location=yes\');">EVERYTHING SERVICES PVT. LTD.</a> is providing you budget in your with unlimited services, you will receive this great opportunity and we are promising that we take all responsibility . We want to save time save money and save efforts want to run the efficient service in remote, Local and Metropolitian Cities.</b>\n        </p>\n        <p>\n            We doesn\'t slow down at any cost. We are fully prepared with all the options and information that you need to choose the right SERVICES PROVIDED, while staying safe inside your present home. Together, we will get through this Happy and safe searching !!!!!\n        </p>\n        <p>\n            We offers our best Services – some Category and unlimited sub Category like - Super Grocery and Food Services, Fast Food and Restaurants, Medical Care Services, Home Care Appliances, Fashion, Marriage, Personal Services, Mechanic and Skill Services, Auto Rikshaw – Taxi and Services, Tours and Travels, Education, Hobby, Safety, Mobile and Electronic, Finance, Emergency, Covid – 19 Safety Product, Sweet and Farsan Namkeen, Advertisement, Pest Control, Religious Scholar.\n        </p>\n        <p>From today our services to you is the main motive of our company</p>\n        <p><b>Service provider description</b><br/> We are the opportunity to grow your business. We have a heavy means of service opportunity which gives you immense call up by our customer are searching through online website and application.</p>\n        <p><b>Target and motive of our company</b><br/> Our target and are simply wants customer satisfaction. Our target are justified, that you get the right services and at the right time. And our motive are to become a leading service provider in India. Which we are working hard for it.And becoming leading runners business in India and in the world in the future. Our motive is that all Skilled - Unskilled and Professional and Unprofessional all together. We will all covered in one Platform i.e Online Services</p>\n        <p>We want to thank all our fantastic supporters for your kindness and generosity and reach out to our partners and local organizations that work with our people.</p>\n        <p>We wish all your best Collaboration and Receiving Service from our Company</p>\n        <p>&nbsp;</p>\n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaqPage = /** @class */ (function () {
    function FaqPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    FaqPage.prototype.reset = function () {
        this.faqExpand1 = false;
        this.faqExpand2 = false;
        this.faqExpand3 = false;
        this.faqExpand4 = false;
        this.faqExpand5 = false;
        this.faqExpand6 = false;
        this.faqExpand7 = false;
        this.faqExpand8 = false;
    };
    FaqPage.prototype.faqExpandToggle1 = function () {
        this.reset();
        this.faqExpand1 = !this.faqExpand1;
    };
    FaqPage.prototype.faqExpandToggle2 = function () {
        this.reset();
        this.faqExpand2 = !this.faqExpand2;
    };
    FaqPage.prototype.faqExpandToggle3 = function () {
        this.reset();
        this.faqExpand3 = !this.faqExpand3;
    };
    FaqPage.prototype.faqExpandToggle4 = function () {
        this.reset();
        this.faqExpand4 = !this.faqExpand4;
    };
    FaqPage.prototype.faqExpandToggle5 = function () {
        this.reset();
        this.faqExpand5 = !this.faqExpand5;
    };
    FaqPage.prototype.faqExpandToggle6 = function () {
        this.reset();
        this.faqExpand6 = !this.faqExpand6;
    };
    FaqPage.prototype.faqExpandToggle7 = function () {
        this.reset();
        this.faqExpand7 = !this.faqExpand7;
    };
    FaqPage.prototype.faqExpandToggle8 = function () {
        this.reset();
        this.faqExpand8 = !this.faqExpand8;
    };
    FaqPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-faq',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\faq\faq.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'faqs_terms\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-img">\n    <ion-list no-lines>\n        <ion-item [ngClass]="faqExpand1 ? \'active\' : \'\' " (click)="faqExpandToggle1()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand2 ? \'active\' : \'\' " (click)="faqExpandToggle2()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand3 ? \'active\' : \'\' " (click)="faqExpandToggle3()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand4 ? \'active\' : \'\' " (click)="faqExpandToggle4()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand5 ? \'active\' : \'\' " (click)="faqExpandToggle5()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand6 ? \'active\' : \'\' " (click)="faqExpandToggle6()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand7 ? \'active\' : \'\' " (click)="faqExpandToggle7()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n        <ion-item [ngClass]="faqExpand8 ? \'active\' : \'\' " (click)="faqExpandToggle8()">\n            <h2 class="d-flex">\n                About Services\n                <ion-icon class="material-icons end">keyboard_arrow_down</ion-icon>\n            </h2>\n            <p>\n                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\n            </p>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\faq\faq.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], FaqPage);
    return FaqPage;
}());

//# sourceMappingURL=faq.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__picker_picker__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { FirebaseX } from '@ionic-native/firebase-x/ngx';

var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, platform, navparams, formBuilder, http, toastController, storage) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navparams = navparams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.toastController = toastController;
        this.storage = storage;
        this.skill_ids = [];
        this.push_token = '';
        this.submitAttempt = false;
        this.showLoader = false;
        this.otp = null;
    }
    SignupPage.prototype.ngOnInit = function () {
        this.buildForm();
        this.setEmailValidators();
    };
    SignupPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (typeof this.navparams.get('ids') != 'undefined') {
            this.skill_ids = this.navparams.get('ids');
            this.signupForm.get('skills').setValue(this.navparams.get('names'));
            this.signupForm.get('subcat_id').setValue(this.navparams.get('ids'));
        }
        if (this.platform.is('cordova')) {
            window.FirebasePlugin.getToken(function (token) { return _this.push_token = token; });
        }
    };
    SignupPage.prototype.buildForm = function () {
        this.signupForm = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            email: [''],
            skills: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            subcat_id: [''],
            contact: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9{10}]+$')
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8)
                ])],
            otp: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)
                ])]
        });
    };
    SignupPage.prototype.sendOTP = function () {
        if (this.signupForm.get('contact').valid) {
            this.otp = Math.floor(100000 + Math.random() * 900000);
            this.http.post(__WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["a" /* APIURL */] + 'service-providers/send-otp', { otp: this.otp, phone: this.signupForm.get('contact').value })
                .subscribe({
                next: function (data) {
                    //nothing to do
                },
                error: function (error) {
                    console.error('There was an error!', error);
                }
            });
        }
    };
    SignupPage.prototype.resend = function () {
        var _this = this;
        this.showLoader = true;
        if (this.signupForm.get('contact').valid) {
            this.otp = Math.floor(100000 + Math.random() * 900000);
            this.http.post(__WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["a" /* APIURL */] + 'service-providers/send-otp', { otp: this.otp, phone: this.signupForm.get('contact').value })
                .subscribe({
                next: function (data) {
                    _this.showLoader = false;
                    alert('OTP has been resent!');
                    //nothing to do
                },
                error: function (error) {
                    _this.showLoader = false;
                    console.error('There was an error!', error);
                }
            });
        }
    };
    SignupPage.prototype.setEmailValidators = function () {
        var emailControl = this.signupForm.get('email');
        emailControl.valueChanges.pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["distinctUntilChanged"])()).subscribe(function (value) {
            if (value != '') {
                emailControl.setValidators(__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$'));
            }
            else {
                emailControl.setValidators(null);
            }
            emailControl.updateValueAndValidity();
        });
    };
    SignupPage.prototype.openTerms = function () {
        window.open("https://everythingservices.in/terms", '_system', 'location=yes');
    };
    SignupPage.prototype.openPicker = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__picker_picker__["a" /* PickerPage */]);
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.signupForm.get('otp').value != this.otp) {
            this.signupForm.get('otp').markAsDirty();
            return false;
        }
        if (this.signupForm.valid) {
            this.showLoader = true;
            var data = this.signupForm.value;
            data['push_token'] = this.push_token;
            delete data['otp'];
            this.http.post(__WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["a" /* APIURL */] + 'service-providers?key=25e86ce50a1544c871f066cff5651adb', data)
                .subscribe({
                next: function (data) {
                    _this.submitAttempt = false;
                    _this.showLoader = false;
                    var toast = _this.toastController.create({
                        message: 'Registration was successful. Kindly make the payment through Payment link sent to your mobile number in order to activate your account.',
                        duration: 5000,
                        cssClass: 'toast-success'
                    });
                    toast.present();
                    var that = _this;
                    setTimeout(function () {
                        that.navCtrl.pop();
                    }, 5000);
                },
                error: function (error) {
                    _this.submitAttempt = false;
                    _this.showLoader = false;
                    var toast = _this.toastController.create({
                        message: error.error.msg,
                        duration: 3000,
                        cssClass: 'toast-danger'
                    });
                    toast.present();
                }
            });
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\signup\signup.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'enter_sign_up_info\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-img">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div> \n    <div class="form">\n        <form [formGroup]="signupForm">\n            <ion-list no-lines>\n                <ion-item [class.invalid]="!signupForm.controls.name.valid && (signupForm.controls.name.dirty || submitAttempt)">\n                    <ion-icon class="material-icons" item-start>person</ion-icon>\n                    <ion-label floating>{{\'full_name\' | translate}}</ion-label>\n                    <ion-input autocomplete="off" formControlName="name" type="text"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!signupForm.controls.name.valid  && (signupForm.controls.name.dirty || submitAttempt)">Please enter your full name.</p>\n\n                <ion-item [class.invalid]="!signupForm.controls.email.valid && (signupForm.controls.email.dirty || submitAttempt)">\n                    <ion-icon class="material-icons" item-start>email</ion-icon>\n                    <ion-label floating>{{\'email_address\' | translate}}</ion-label>\n                    <ion-input autocomplete="off" formControlName="email" type="text"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!signupForm.controls.email.valid  && (signupForm.controls.email.dirty || submitAttempt)">Please enter a valid email address.</p>\n\n                <ion-item [class.invalid]="!signupForm.controls.contact.valid && (signupForm.controls.contact.dirty || submitAttempt)">\n                    <ion-icon class="material-icons" item-start>phone_android</ion-icon>\n                    <ion-label floating>{{\'mobile_number\' | translate}}</ion-label>\n                    <ion-input autocomplete="off" (ionBlur)="sendOTP()" formControlName="contact" maxlength="10" type="tel"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!signupForm.controls.contact.valid && (signupForm.controls.contact.dirty || submitAttempt)">Please enter your mobile number.</p>\n                <p text-right *ngIf="signupForm.controls.contact.valid"><a href="#" (click)="resend()">Resend OTP?</a></p>\n\n                 <ion-item [class.invalid]="!signupForm.controls.password.valid && (signupForm.controls.password.dirty || submitAttempt)">\n                    <ion-icon class="material-icons" item-start>lock</ion-icon>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input autocomplete="off" formControlName="password" type="password" *ngIf="!showPasswordText"></ion-input>\n                    <ion-input autocomplete="off" formControlName="password" type="text" *ngIf="showPasswordText"></ion-input>\n                    <button ion-button clear color="dark" type="button" item-right (click)="showPasswordText = !showPasswordText">\n                        <ion-icon style="font-size: 20px; margin-top: 13px" name="eye"></ion-icon>\n                    </button>\n                </ion-item>\n                <p class=\'error\' *ngIf="!signupForm.controls.password.valid  && (signupForm.controls.password.dirty || submitAttempt)">Please enter minimum 8 character password.</p>\n\n                <ion-item [class.invalid]="!signupForm.controls.skills.valid && (signupForm.controls.skills.dirty || submitAttempt)">\n                    <ion-icon class="material-icons" item-start>work_outline</ion-icon>\n                    <ion-label floating>Skills</ion-label>\n                    <ion-input autocomplete="off" (ionFocus)="openPicker()" formControlName="skills" type="text"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!signupForm.controls.skills.valid  && (signupForm.controls.skills.dirty || submitAttempt)">Please enter skills you want to work for.</p>\n\n                <ion-item class="verification_code">\n                    <ion-icon class="material-icons" item-start>mobile_friendly</ion-icon>\n                    <ion-label floating>{{\'enter_verification_code\' | translate}}</ion-label>\n                    <ion-input autocomplete="off" type="number" formControlName="otp"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!signupForm.controls.otp.valid && (signupForm.controls.otp.dirty || submitAttempt)">Please enter valid OTP.</p>\n\n                <ion-item>\n                    <ion-label class="clickEnableCls">I agree to all the <a (click)="openTerms()" class="text-md-secondary">Terms &amp; Conditions</a> of Everything Services Pvt. Ltd.</ion-label>\n                    <ion-checkbox disabled checked="true" color="success"></ion-checkbox>\n                </ion-item>\n\n            </ion-list>\n            <button ion-button block class="btn" (click)="signup()"> {{\'signup\' | translate}}</button>\n            <br/><br/>\n        </form>    \n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotPage = /** @class */ (function () {
    function ForgotPage(navCtrl, http, toast) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.toast = toast;
        this.showLoader = false;
        this.mobile = '';
    }
    ForgotPage.prototype.createToast = function (msg, css, duration, pos) {
        var toast = this.toast.create({
            message: msg,
            duration: duration,
            cssClass: css,
            position: pos
        });
        toast.present();
    };
    ForgotPage.prototype.sendEmail = function () {
        var _this = this;
        this.showLoader = true;
        var regex = /^[0-9]{10}$/;
        if (this.mobile.trim() == '' || !regex.test(this.mobile) || this.mobile.length < 10) {
            this.createToast('Please enter a valid mobile number.', 'toast-danger', 4000, 'top');
            this.showLoader = false;
            return false;
        }
        this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'service-providers/forgot', { contact: this.mobile })
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                if (response['error'] == 0) {
                    var that = _this;
                    _this.mobile = '';
                    _this.createToast('Password Reset Link has been sent to your registered mobile number and email address.', 'toast-success', 5000, 'bottom');
                    setTimeout(function () {
                        that.navCtrl.pop();
                    }, 5000);
                }
                else {
                    var toast = _this.toast.create({
                        message: response['reason'],
                        duration: 5000,
                        cssClass: 'toast-danger',
                        position: 'bottom'
                    });
                    toast.present();
                }
            },
            error: function (err) {
                _this.showLoader = false;
                _this.createToast('Some technical glitch observed. Please try again.', 'toast-dnger', 3000, 'bottom');
            }
        });
    };
    ForgotPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\forgot\forgot.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n    <div class="text_box">\n        <h2>{{\'forgot_password\' | translate}}</h2>\n        <h3>{{\'forgot_text_1\' | translate}}<br>{{\'forgot_text_2\' | translate}}</h3>\n    </div>\n</ion-header>\n\n<ion-content class="bg-img">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>\n    <div class="form">\n        <ion-list no-lines>\n            <ion-item>\n                <ion-icon class="material-icons" item-start>phone</ion-icon>\n                <ion-label floating>{{\'mobile_number\' | translate}}</ion-label>\n                <ion-input type="text" maxlength="10" [(ngModel)]="mobile"></ion-input>\n            </ion-item>\n        </ion-list>\n        <button ion-button block class="btn" (click)="sendEmail()"> {{\'Continue\' | translate}}</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\forgot\forgot.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ForgotPage);
    return ForgotPage;
}());

//# sourceMappingURL=forgot.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {Plumber_profilePage} from '../plumber_profile/plumber_profile';
var ConversationPage = /** @class */ (function () {
    function ConversationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ConversationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-conversation',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\conversation\conversation.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            <div class="user_profile d-flex">\n                <div class="center_img profile_img">\n                    <img src="assets/imgs/plumber_profile.png" class="crop_img">\n                </div>\n                <div class="text_box">\n                    <h2>Samantha Smith</h2>\n                    <p class="d-flex">Plumber</p>\n                </div>\n            </div>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <div class="chat_container d-flex">\n        <div class="chat_box d-flex received">\n            <div class="chat">\n                <h2>Hey George, <br>Available?</h2>\n                <p>12:01 pm</p>\n            </div>\n        </div>\n        <div class="chat_box d-flex  send">\n            <div class="chat">\n                <h2>Hello Ma,m <br>How may I help you?</h2>\n                <p>12:02 pm</p>\n            </div>\n        </div>\n    </div>\n</ion-content>\n\n<ion-footer no-border>\n    <div class="form">\n        <ion-list no-lines>\n            <ion-item>\n                <ion-input type="text" placeholder="{{\'write_your_message\' | translate}}"></ion-input>\n                <ion-icon item-end class="material-icons">send</ion-icon>\n            </ion-item>\n        </ion-list>\n    </div>\n</ion-footer>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\conversation\conversation.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], ConversationPage);
    return ConversationPage;
}());

//# sourceMappingURL=conversation.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Purchase_planPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Purchase_planPage = /** @class */ (function () {
    function Purchase_planPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Purchase_planPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-purchase_plan',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\purchase_plan\purchase_plan.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'purchase_subscription\' | translate}}</ion-title>\n    </ion-navbar>\n    <ion-list no-lines>\n        <ion-item (click)="purchase_plan()">\n            <h3 class="d-flex">Premium Plan <span class="end">$50.00</span></h3>\n            <h4>Get Unlimited Leads for a Month</h4>\n        </ion-item>\n    </ion-list>\n</ion-header>\n\n<ion-content class="bg-img">\n    <div class="">\n        <ion-list no-lines>\n            <h2>{{\'payment_methods\' | translate}}</h2>\n            <ion-item>\n                <img src="assets/imgs/card.png" item-start>\n                <h3>{{\'credit_card\' | translate}}</h3>\n            </ion-item>\n            <ion-item>\n                <img src="assets/imgs/card.png" item-start>\n                <h3>{{\'debit_card\' | translate}}</h3>\n            </ion-item>\n            <ion-item>\n                <img src="assets/imgs/paypal.png" item-start>\n                <h3>{{\'paypal\' | translate}}</h3>\n            </ion-item>\n            <ion-item>\n                <img src="assets/imgs/google_play.png" item-start>\n                <h3>{{\'googleplay\' | translate}}</h3>\n            </ion-item>\n        </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\purchase_plan\purchase_plan.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], Purchase_planPage);
    return Purchase_planPage;
}());

//# sourceMappingURL=purchase_plan.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_geolocation__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_gallery_modal__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_about_about__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_all_reviews_all_reviews__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_account_account__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_appointment_status_appointment_status__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_appointments_appointments__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_category_category__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_chats_chats__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_contact_contact__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_conversation_conversation__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_faq_faq__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_forgot_forgot__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_languag_languag__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_my_profile_my_profile__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_notification_notification__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_purchase_plan_purchase_plan__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_ratings_ratings__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_signin_signin__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_signup_signup__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_subscription_subscription__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_tabs_tabs__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_picker_picker__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_location_select_location_select__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_earnings_earnings__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_change_password_change_password__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_popover_popover__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_status_bar__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_add_product_add_product__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_product_list_product_list__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_product_detail_product_detail__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











//import { FirebaseX } from '@ionic-native/firebase-x/ngx';



//import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_all_reviews_all_reviews__["a" /* All_reviewsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_appointment_status_appointment_status__["a" /* Appointment_statusPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_appointments_appointments__["a" /* AppointmentsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_conversation_conversation__["a" /* ConversationPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_faq_faq__["a" /* FaqPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_forgot_forgot__["a" /* ForgotPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_languag_languag__["a" /* LanguagPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_my_profile_my_profile__["a" /* My_profilePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_purchase_plan_purchase_plan__["a" /* Purchase_planPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_ratings_ratings__["a" /* RatingsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_subscription_subscription__["a" /* SubscriptionPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_picker_picker__["a" /* PickerPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_location_select_location_select__["a" /* LocationSelect */],
                __WEBPACK_IMPORTED_MODULE_37__pages_earnings_earnings__["a" /* EarningsPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_add_product_add_product__["a" /* AddProductPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_product_list_product_list__["a" /* ProductListPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_product_detail_product_detail__["a" /* ProductDetailPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_popover_popover__["a" /* PopoverPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/earnings/earnings.module#EarningsPageModule', name: 'EarningsPage', segment: 'earnings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/picker/picker.module#PickerPageModule', name: 'PickerPage', segment: 'picker', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-detail/product-detail.module#ProductDetailPageModule', name: 'ProductDetailPage', segment: 'product-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-list/product-list.module#ProductListPageModule', name: 'ProductListPage', segment: 'product-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-product/add-product.module#AddProductPageModule', name: 'AddProductPage', segment: 'add-product', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_13_ionic_gallery_modal__["c" /* GalleryModalModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_all_reviews_all_reviews__["a" /* All_reviewsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_appointment_status_appointment_status__["a" /* Appointment_statusPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_appointments_appointments__["a" /* AppointmentsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_conversation_conversation__["a" /* ConversationPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_faq_faq__["a" /* FaqPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_forgot_forgot__["a" /* ForgotPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_languag_languag__["a" /* LanguagPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_my_profile_my_profile__["a" /* My_profilePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_purchase_plan_purchase_plan__["a" /* Purchase_planPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_ratings_ratings__["a" /* RatingsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_subscription_subscription__["a" /* SubscriptionPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_picker_picker__["a" /* PickerPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_location_select_location_select__["a" /* LocationSelect */],
                __WEBPACK_IMPORTED_MODULE_37__pages_earnings_earnings__["a" /* EarningsPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_add_product_add_product__["a" /* AddProductPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_product_list_product_list__["a" /* ProductListPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_product_detail_product_detail__["a" /* ProductDetailPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_popover_popover__["a" /* PopoverPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_13_ionic_gallery_modal__["b" /* GalleryModalHammerConfig */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_ngx_translate_core__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { StatusBar } from '@ionic-native/status-bar';

//import { LanguagPage } from '../pages/languag/languag';


var MyApp = /** @class */ (function () {
    function MyApp(platform, splashScreen, translate) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.translate = translate;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__["a" /* SigninPage */];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.translate.setDefaultLang('en');
            _this.translate.use('en');
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\app\app.html"*/'<ion-nav #myNav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__node_modules_ngx_translate_core__["c" /* TranslateService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryPage = /** @class */ (function () {
    function CategoryPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\category\category.html"*/'<ion-header class="bg-img">\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n    <div class="text_box ">\n        <h1 text-center>Plumbing</h1>\n    </div>\n</ion-header>\n\n<ion-content class="bg-color">\n    <ion-list no-lines>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Tap, Wash Basin and sink problem</span></h2>\n                <p>86 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Bathroom fittings</span></h2>\n                <p>77 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Blocks & Leakages</span></h2>\n                <p>99 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Water tank problem</span></h2>\n                <p>83 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Pineline & pumps</span></h2>\n                <p>72 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Toilet pipe Problem</span></h2>\n                <p>68 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Tap, Wash Basin and sink problem</span></h2>\n                <p>86 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Bathroom fittings</span></h2>\n                <p>77 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Blocks & Leakages</span></h2>\n                <p>99 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Water tank problem</span></h2>\n                <p>83 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Pineline & pumps</span></h2>\n                <p>72 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label>\n                <h2 class="d-flex"><span>Toilet pipe Problem</span></h2>\n                <p>68 Service provider available</p>\n            </ion-label>\n            <ion-checkbox item-end></ion-checkbox>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\category\category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__conversation_conversation__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatsPage = /** @class */ (function () {
    function ChatsPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ChatsPage.prototype.conversation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__conversation_conversation__["a" /* ConversationPage */]);
    };
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\chats\chats.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'chats\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n    <ion-list no-lines>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n        <ion-item (click)="conversation()">\n            <div class="img_box center_img" item-start>\n                <img src="assets/imgs/plumber_profile.png" class="crop_img">\n            </div>\n            <h2><span>George Smith</span></h2>\n            <h3 class="d-flex">Plumber <span class="end">11:48 am</span></h3>\n            <p class="d-flex">Yeah, We are thankfull to you.</p>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\chats\chats.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguagPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LanguagPage = /** @class */ (function () {
    function LanguagPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    LanguagPage.prototype.signin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]);
    };
    LanguagPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-languag',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\languag\languag.html"*/'<!--\n<ion-header>\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n</ion-header>\n-->\n\n<ion-content class="bg-img">\n    <div class="logo_box">\n        <img src="assets/imgs/logo.png">\n    </div>\n</ion-content>\n<ion-footer no-border>\n    <p text-center>{{\'select_preffered_app_language\' | translate}}</p>\n    <ion-row>\n        <ion-col col-6>\n            <button ion-button block class="btn francaic" (click)="signin()"> {{\'francaic\' | translate}}</button>\n        </ion-col>\n        <ion-col col-6>\n            <button ion-button block class="btn" (click)="signin()"> {{\'english\' | translate}}</button>\n        </ion-col>\n    </ion-row>\n</ion-footer>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\languag\languag.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], LanguagPage);
    return LanguagPage;
}());

//# sourceMappingURL=languag.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__purchase_plan_purchase_plan__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SubscriptionPage = /** @class */ (function () {
    function SubscriptionPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SubscriptionPage.prototype.purchase_plan = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__purchase_plan_purchase_plan__["a" /* Purchase_planPage */]);
    };
    SubscriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-subscription',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\subscription\subscription.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'your_subscription\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-img">\n    <div class="banner" text-center>\n        <h1>03</h1>\n        <h2>Ieads remaining today</h2>\n        <h2>21 days left</h2>\n    </div>\n\n    <ion-list no-lines>\n        <h2>{{\'purchase_subscription\' | translate}}</h2>\n        <ion-item (click)="purchase_plan()">\n            <h3 class="d-flex">Premium Plan <span class="end">$50.00</span></h3>\n            <h4>Get Unlimited Leads for a Month</h4>\n        </ion-item>\n        <ion-item (click)="purchase_plan()">\n            <h3 class="d-flex">Economy Plan <span class="end">$30.00</span></h3>\n            <h4>Get 5 evryday Leads for a Month</h4>\n        </ion-item>\n        <ion-item (click)="purchase_plan()">\n            <h3 class="d-flex">Premium Plan <span class="end">$10.00</span></h3>\n            <h4>Get Unlimited Leads for a Month</h4>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\subscription\subscription.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], SubscriptionPage);
    return SubscriptionPage;
}());

//# sourceMappingURL=subscription.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appointments_appointments__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_notification__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ratings_ratings__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__earnings_earnings__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { ChatsPage } from '../chats/chats';

var TabsPage = /** @class */ (function () {
    function TabsPage(platform, navCtrl, app, alertCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__appointments_appointments__["a" /* AppointmentsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__notification_notification__["a" /* NotificationPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__ratings_ratings__["a" /* RatingsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__account_account__["a" /* AccountPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_6__earnings_earnings__["a" /* EarningsPage */];
    }
    TabsPage.prototype.ionViewWillLeave = function () {
        /*const alert = this.alertCtrl.create({
              title: 'Exit App?',
              message: 'Do you want to exit the application?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {}
                },
                {
                  text: 'Exit',
                  handler: () => {
                    this.platform.exitApp();
                  }
                }
              ]
          });
        alert.present();
        return false;*/
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\tabs\tabs.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabTitle="{{\'appointments\' | translate}}" tabIcon="md-calendar" tabsHideOnSubPages="true"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="{{\'ratings\' | translate}}" tabIcon="ios-star-half-outline" tabsHideOnSubPages="true"></ion-tab>\n    <ion-tab [root]="tab5Root" tabTitle="Earnings" tabIcon="md-cash" tabsHideOnSubPages="true"></ion-tab>\n    <!-- <ion-tab [root]="tab2Root" tabTitle="{{\'notifications\' | translate}}" tabIcon="md-notifications" tabsHideOnSubPages="true"></ion-tab> -->\n    <ion-tab [root]="tab4Root" tabTitle="{{\'account\' | translate}}" tabIcon="md-person" tabsHideOnSubPages="true"></ion-tab>\n    <!--<ion-tab [root]="tab5Root" tabTitle="{{\'chats\' | translate}}" tabIcon="md-chatboxes" tabsHideOnSubPages="true"></ion-tab>-->\n</ion-tabs>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\tabs\tabs.html"*/,
            selector: 'page-tabs',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_tabs__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__forgot_forgot__ = __webpack_require__(232);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { FirebaseX } from '@ionic-native/firebase-x/ngx';



var SigninPage = /** @class */ (function () {
    function SigninPage(navCtrl, platform, formBuilder, http, toastController, storage) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.http = http;
        this.toastController = toastController;
        this.storage = storage;
        this.push_token = '';
        this.submitAttempt = false;
        this.showLoader = true;
        this.loginForm = formBuilder.group({
            mobile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9{10}]+$')
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    SigninPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.storage.get('userinfo').then(function (result) {
                _this.showLoader = false;
                if (typeof result != 'undefined' && result !== null && result !== '') {
                    if (_this.platform.is('cordova')) {
                        var user_1 = JSON.parse(result);
                        _this.firebasePlugin.onTokenRefresh(function (token) {
                            _this.push_token = token;
                            _this.http.put(__WEBPACK_IMPORTED_MODULE_5__app_apiconfig__["a" /* APIURL */] + 'service-providers/' + user_1.id + '?access-token=' + user_1.token, { push_token: token })
                                .subscribe({
                                next: function (data) {
                                },
                                error: function (error) {
                                }
                            });
                        });
                    }
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */]);
                }
            });
            if (_this.platform.is('cordova')) {
                _this.firebasePlugin = window.FirebasePlugin;
                var channel = {
                    id: "sp",
                    sound: "evsound",
                    vibration: true,
                    light: true,
                    lightColor: parseInt("FF0000FF", 16).toString(),
                    importance: 4,
                    badge: true,
                    visibility: 1
                };
                _this.firebasePlugin.createChannel(channel);
                //this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
                _this.firebasePlugin.getToken(function (token) {
                    _this.push_token = token;
                });
            }
        });
    };
    /*onMessageReceived(message){
      if (message.tap) {
        this.navCtrl.push(Appointment_statusPage, {id: message.order_id})
      } else {
        //received while app in foreground (show a toast)
        let toast = this.toastController.create({
          message: message.body,
          duration: 5000,
          position: 'top',
          cssClass: 'toast-info'
        });
        toast.present();
      }
    }*/
    SigninPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.forgot = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__forgot_forgot__["a" /* ForgotPage */]);
    };
    SigninPage.prototype.login = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.loginForm.valid) {
            this.showLoader = true;
            var data = { push_token: this.push_token, mobile: this.loginForm.controls.mobile.value, password: this.loginForm.controls.password.value };
            this.http.post(__WEBPACK_IMPORTED_MODULE_5__app_apiconfig__["a" /* APIURL */] + 'service-providers/login', data)
                .subscribe({
                next: function (data) {
                    _this.submitAttempt = false;
                    _this.showLoader = false;
                    if (data.error == 1) {
                        var toast = _this.toastController.create({
                            message: data.reason,
                            duration: 5000,
                            cssClass: 'toast-danger'
                        });
                        toast.present();
                    }
                    else {
                        _this.loginForm.controls.mobile.setValue('');
                        _this.loginForm.controls.password.setValue('');
                        _this.storage.set('userinfo', JSON.stringify(data));
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */]);
                    }
                },
                error: function (error) {
                    _this.submitAttempt = false;
                    console.error('There was an error!', error);
                }
            });
        }
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\signin\signin.html"*/'<ion-content class="bg-img">\n    <div *ngIf="showLoader" class="loader-bg">\n        <ion-spinner class="spinner" color="light"></ion-spinner>\n    </div>    \n    <div class="form">\n        <form [formGroup]="loginForm">\n            <div align="center">\n                <img src="assets/imgs/logo_new.png" align="center" height="150" />\n                <h5 class="text-wp-light" text-center style="margin-top: 3vh">If you haven\'t signed up yet, <a (click)="signup()">Sign Up</a></h5>\n            </div>    \n            <ion-list no-lines>\n                <ion-item [class.invalid]="!loginForm.controls.mobile.valid && submitAttempt">\n                    <ion-icon class="material-icons" item-start>phone_android</ion-icon>\n                    <ion-label floating>Mobile Number</ion-label>\n                    <ion-input autocomplete="off" type="text" formControlName="mobile" maxlength="10"></ion-input>\n                </ion-item>\n                <p class=\'error\' *ngIf="!loginForm.controls.mobile.valid  && submitAttempt">Please enter a valid mobile number.</p>\n\n                <ion-item [class.invalid]="!loginForm.controls.password.valid && submitAttempt">\n                    <ion-icon class="material-icons" item-start>lock</ion-icon>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input autocomplete="off" formControlName="password" type="password" *ngIf="!showPasswordText"></ion-input>\n                    <ion-input autocomplete="off" formControlName="password" type="text" *ngIf="showPasswordText"></ion-input>\n                    <button ion-button clear color="dark" type="button" item-right (click)="showPasswordText = !showPasswordText">\n                        <ion-icon style="font-size: 20px; margin-top: 13px" name="eye"></ion-icon>\n                    </button>\n                </ion-item>\n                <p class=\'error\' *ngIf="!loginForm.controls.password.valid  && submitAttempt">Please enter a password.</p>\n\n                <button ion-button block class="btn" (click)="login()"> {{\'Login\'}}</button>\n            </ion-list>\n        </form>    \n        <p text-right><a style="font-size: 1.5rem" (click)="forgot()" href="#">{{"Forgot Password?"}}</a></p>\n        <div align="center" class="social-icons">\n            <a href="#" onclick="window.open(\'https://bit.ly/3hwDQRN\', \'_system\', \'location=yes\');">\n                <svg width="25" height="25" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                  <use xlink:href="assets/imgs/feather-sprite.svg#youtube"/>\n                </svg>\n            </a>\n            <a href="#" onclick="window.open(\'https://bit.ly/2E4Fk8c\', \'_system\', \'location=yes\');">\n                <svg width="25" height="25" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                  <use xlink:href="assets/imgs/feather-sprite.svg#facebook"/>\n                </svg>\n            </a>\n            <a href="#" onclick="window.open(\'https://twitter.com/everythingserv2\', \'_system\', \'location=yes\');">\n                <svg width="25" height="25" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                  <use xlink:href="assets/imgs/feather-sprite.svg#twitter"/>\n                </svg>\n            </a>\n            <a href="#" onclick="window.open(\'http://www.linkedin.com/in/everything-services\', \'_system\', \'location=yes\');">\n                <svg width="25" height="25" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                  <use xlink:href="assets/imgs/feather-sprite.svg#linkedin"/>\n                </svg>\n            </a>\n            <a href="#" onclick="window.open(\'https://www.instagram.com/everything_services/\', \'_system\', \'location=yes\');">\n                <svg width="25" height="25" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                  <use xlink:href="assets/imgs/feather-sprite.svg#instagram"/>\n                </svg>\n            </a>\n        </div>    \n    </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\signin\signin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PickerPage = /** @class */ (function () {
    function PickerPage(navCtrl, navparams, http) {
        this.navCtrl = navCtrl;
        this.navparams = navparams;
        this.http = http;
        this.skills = [];
        this.filteredskills = [];
        this.subcat_id = [];
        this.fee = 0.00;
        this.total = 0.00;
        this.ids = [];
        this.names = [];
        this.showLoader = true;
        this.multi_fee = 0;
    }
    PickerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'service-providers/skills').subscribe({
            next: function (data) {
                _this.skills = _this.filteredskills = data;
                _this.showLoader = false;
            },
            error: function (err) {
                console.error(err);
            }
        });
        //getting multi fee value
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + 'service-providers/settings').subscribe({
            next: function (data) {
                _this.multi_fee = data.value;
                _this.showLoader = false;
            },
            error: function (err) {
                console.error(err);
            }
        });
    };
    PickerPage.prototype.filterItems = function (searchTerm) {
        var newArr = [];
        this.skills.filter(function (item) {
            var cat = item.category;
            var subcatArr = [];
            item.subcat.forEach(function (a) {
                if (a.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    subcatArr.push(a);
                }
            });
            if (subcatArr.length > 0) {
                newArr.push({ category: cat, subcat: subcatArr });
            }
        });
        this.filteredskills = newArr;
    };
    PickerPage.prototype.ionViewDidEnter = function () {
        if (typeof this.navparams.get('ids') != 'undefined') {
            var ids = this.navparams.get('ids');
            for (var i = 0; i < ids.length; i++) {
                this.subcat_id[ids[i]] = true;
            }
        }
    };
    PickerPage.prototype.updateSelected = function (obj) {
        if (this.subcat_id[obj.id] === true) {
            this.fee += parseFloat(obj.registration_cost);
            this.ids.push(obj.id);
            this.names.push(obj.name);
        }
        else {
            this.fee -= parseFloat(obj.registration_cost);
            this.ids.splice(this.ids.indexOf(obj.id), 1);
            this.names.splice(this.names.indexOf(obj.name), 1);
        }
        if (this.subcat_id.length > 1 && this.fee > this.multi_fee) {
            this.total = this.multi_fee;
        }
        else {
            this.total = this.fee;
        }
    };
    PickerPage.prototype.goBackWithSkills = function () {
        this.navCtrl.getPrevious().data.ids = this.ids.join(', ');
        this.navCtrl.getPrevious().data.names = this.names.join(', ');
        this.navCtrl.pop();
    };
    PickerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-picker',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\picker\picker.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Select your skills\n    </ion-title>\n  </ion-navbar>\n  <ion-searchbar (ionChange)="filterItems($event.value)"></ion-searchbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="showLoader" class="loader-bg">\n      <ion-spinner class="spinner" color="light"></ion-spinner>\n  </div>\n  \n  <ion-list *ngFor="let item of filteredskills">\n    <ion-list-header>{{item.category}}</ion-list-header>\n\n    <ion-item *ngFor="let sc of item.subcat">\n      <ion-label>{{sc.name}} <p>(-) {{sc.commission_perc}}% Commission</p></ion-label>\n      <ion-checkbox [(ngModel)]="subcat_id[sc.id]" (ionChange)="updateSelected(sc)" color="secondary"></ion-checkbox>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n	<ion-grid>\n  		<ion-row>\n		    <ion-col col-9>\n		      <h4>Registration Cost : ₹{{this.total}}</h4>\n		    </ion-col>\n		    <ion-col>		\n  				<button ion-button outline float-right (click)="goBackWithSkills()">OK</button>				\n  			</ion-col>\n  		</ion-row>\n  	</ion-grid>		\n</ion-footer>'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\picker\picker.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], PickerPage);
    return PickerPage;
}());

//# sourceMappingURL=picker.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_product_add_product__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__product_detail_product_detail__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductListPage = /** @class */ (function () {
    function ProductListPage(navCtrl, navParams, toastController, storage, actionsheet, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastController = toastController;
        this.storage = storage;
        this.actionsheet = actionsheet;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.product_list = [];
        this.showLoader = false;
        this.user = {};
    }
    ProductListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ProductListPage');
        this.storage.get('cuserinfo').then(function (result) {
            _this.user = JSON.parse(result);
            _this.getProductList();
        });
    };
    ProductListPage.prototype.getProductList = function () {
        var _this = this;
        this.showLoader = true;
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + "products/product-list?key=" + this.user.token + "&sp_id=" + this.user.id, {})
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                console.log('response is ', response);
                _this.product_list = response;
            },
            error: function (err) {
                _this.showLoader = false;
            }
        });
    };
    ProductListPage.prototype.editProduct = function (item) {
        console.log('item is ', item);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__add_product_add_product__["a" /* AddProductPage */], { product: item });
    };
    ProductListPage.prototype.goToAddProductPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__add_product_add_product__["a" /* AddProductPage */]);
    };
    ProductListPage.prototype.goToDetail = function (item) {
        console.log('detail');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__product_detail_product_detail__["a" /* ProductDetailPage */], { product: item });
    };
    ProductListPage.prototype.askDeleteCOnfirmation = function (item, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Product',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        console.log('Buy clicked');
                        _this.deleteProduct(item, index);
                    }
                }
            ]
        });
        alert.present();
    };
    ProductListPage.prototype.deleteProduct = function (item, index) {
        var _this = this;
        // return false;
        this.showLoader = true;
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_apiconfig__["a" /* APIURL */] + "products/del-product?key=" + this.user.token + "&id=" + item.product_id, {})
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                if (response.error == 0) {
                    _this.product_list.splice(index, 1);
                    var toast = _this.toastController.create({
                        message: "Product deleted successfully.",
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastController.create({
                        message: response.message,
                        duration: 2000,
                        cssClass: 'toast-danger',
                        position: 'top'
                    });
                    toast.present();
                }
                console.log('response is ', response);
            },
            error: function (err) {
                _this.showLoader = false;
                var toast = _this.toastController.create({
                    message: "Something went wrong.",
                    duration: 2000,
                    cssClass: 'toast-danger',
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    ProductListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-list',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\product-list\product-list.html"*/'<!--\n  Generated template for the ProductListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="bg-color">\n  <ion-navbar>\n    <ion-title>Products List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-color">\n  <div *ngIf="showLoader" class="loader-bg">\n    <ion-spinner class="spinner" color="light"></ion-spinner>\n  </div>\n  <ion-list class="ios list-ios hydrated card-bg" inset>\n    <ion-item\n      *ngFor="let product of product_list; let i = index;"\n      (click)="goToDetail(product)"\n    >\n      <div class="card-box">\n        <div class="card-image">\n          <ion-thumbnail class="product-image" slot="start">\n            <img src="./../../assets/imgs/avatar.png" />\n          </ion-thumbnail>\n        </div>\n        <div class="card-detail">\n          <h2>{{ product.product_name }}</h2>\n          <p>Price: {{ product.sale_price }}</p>\n          <!-- <div class="stock-box"> -->\n            <p>MRP: {{ product.mrp }}</p>\n            <p class="stock-label" >{{product.stock == 1?\'In Stock\' : \'Out of stock\'}}</p>\n          <!-- </div> -->\n          \n        </div>\n        \n        <div class="btn-box">\n          <!-- <button (click)="editProduct(product, i)" class="icon-sm edit-icon">\n            <ion-icon name="create"></ion-icon>\n          </button>\n          <button (click)="askDeleteCOnfirmation(product ,i)" class="icon-sm delete-icon">\n            <ion-icon name="trash"></ion-icon>\n          </button> -->\n        </div>\n      </div>\n\n    </ion-item>\n  </ion-list>\n  <div class="no-result" *ngIf="product_list.length ==0" style="color: white;">\n    No product found.\n  </div>\n  <ion-fab right bottom>\n    <button (click)="goToAddProductPage()" ion-fab>\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\product-list\product-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ProductListPage);
    return ProductListPage;
}());

//# sourceMappingURL=product-list.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_apiconfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_tabs__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddProductPage = /** @class */ (function () {
    function AddProductPage(navCtrl, toastController, storage, actionsheet, http, navParams, formBuilder, camera) {
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.storage = storage;
        this.actionsheet = actionsheet;
        this.http = http;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.showLoader = false;
        this.pageHeading = "Add Product";
        this.btnHeading = "Add Product";
        this.submitAttempt = false;
        this.user = {};
        this.edit_form = false;
        this.product_detail = {};
        this.unit_list = __WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["b" /* UNIT_LIST */];
        this.image_update = true;
    }
    AddProductPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AddProductPage');
        this.storage.get('cuserinfo').then(function (result) {
            _this.user = JSON.parse(result);
        });
        this.product_detail = this.navParams.get('product');
        if (this.product_detail) {
            this.edit_form = true;
        }
        this.buildForm();
    };
    AddProductPage.prototype.onSelImage = function (files) {
        var _this = this;
        console.log('files => ', files.length);
        if (files.length == 0) {
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.image_update = true;
            _this.product_image = reader.result;
        };
    };
    AddProductPage.prototype.buildForm = function () {
        this.productForm = this.formBuilder.group({
            product_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(100), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9A-Za-zÀ-ÿ\s,._+; ()*~#@!?&-]+$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            product_unit: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10)])],
            unit_value: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9{10}]+$')])],
            sale_price: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9{10}]+$')])],
            product_mrp: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9{10}]+$')])],
            discount_price: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[0-9{10}]+$')])],
            in_stock: [false],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        if (this.edit_form) {
            console.log('edit form ', this.product_detail);
            this.productForm.patchValue({
                product_name: this.product_detail['product_name'],
                product_unit: this.product_detail['unit'],
                unit_value: this.product_detail['unit_value'],
                sale_price: this.product_detail['sale_price'],
                product_mrp: this.product_detail['mrp'],
                discount_price: this.product_detail['discount'],
                in_stock: this.product_detail['stock'] == 1 ? true : false,
                description: this.product_detail['description'],
            });
            this.product_image = this.product_detail['image'];
        }
    };
    AddProductPage.prototype.actionSheetFile = function () {
        var _this = this;
        var actionSheet = this.actionsheet.create({
            title: 'Set your display picture',
            buttons: [
                {
                    text: 'Browse Photo Albums',
                    role: 'destructive',
                    handler: function () {
                        var options = {
                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            correctOrientation: true
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            _this.product_image = base64Image;
                            _this.image_update = true;
                        });
                    }
                },
                {
                    text: 'Open Camera',
                    role: 'destructive',
                    handler: function () {
                        var options = {
                            quality: 100,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            correctOrientation: true,
                            cameraDirection: 1
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            _this.product_image = base64Image;
                            _this.image_update = true;
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    AddProductPage.prototype.addProduct = function () {
        var _this = this;
        this.submitAttempt = true;
        console.log('form data ', this.productForm.valid, __WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["a" /* APIURL */], this.productForm.get('product_name').value);
        if (!this.productForm.valid) {
            return false;
        }
        var values = this.productForm.value;
        if (values.sale_price > values.product_mrp) {
            var toast = this.toastController.create({
                message: "Sale price cannot be grater than mrp price.",
                duration: 4000,
                cssClass: 'toast-danger',
                position: 'top'
            });
            toast.present();
            return false;
        }
        var formdata = new FormData();
        this.showLoader = true;
        if (this.edit_form) {
            formdata.append("id", this.product_detail['product_id']);
        }
        formdata.append('sp_id', this.user.id);
        formdata.append('name', this.productForm.get('product_name').value);
        formdata.append('description', this.productForm.get('description').value);
        formdata.append('mrp', this.productForm.get('product_mrp').value);
        formdata.append('sale_price', this.productForm.get('sale_price').value);
        formdata.append('discount', this.productForm.get('discount_price').value);
        formdata.append('unit', this.productForm.get('product_unit').value);
        formdata.append('unit_value', this.productForm.get('unit_value').value);
        formdata.append('stock', this.productForm.get('in_stock').value ? 1 : 0);
        if (this.image_update) {
            formdata.append('file', this.product_image);
        }
        var url = __WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["a" /* APIURL */] + "products/product-create?token=" + this.user.token;
        if (this.edit_form) {
            url = __WEBPACK_IMPORTED_MODULE_6__app_apiconfig__["a" /* APIURL */] + "products/update-product?token=" + this.user.token;
        }
        this.http.post(url, formdata)
            .subscribe({
            next: function (response) {
                _this.showLoader = false;
                console.log('response is ', response);
                if (response && response.error && response.error == 1) {
                    var toast = _this.toastController.create({
                        message: response.reason,
                        duration: 4000,
                        cssClass: 'toast-danger',
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastController.create({
                        message: _this.edit_form ? "Product Updated Successfully" : "Product Created Sucessfully.",
                        duration: 4000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */]);
                }
            },
            error: function (err) {
                console.log(err);
                _this.showLoader = false;
                var toast = _this.toastController.create({
                    message: "Something went wrong",
                    duration: 4000,
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    AddProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-add-product',template:/*ion-inline-start:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\add-product\add-product.html"*/'<!--\n  Generated template for the AddProductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="bg-color">\n  <ion-navbar>\n      <ion-title>{{pageHeading | translate}}</ion-title>\n  </ion-navbar>  \n</ion-header>\n\n<ion-content class="bg-color">\n  <div *ngIf="showLoader" class="loader-bg">\n    <ion-spinner class="spinner" color="light"></ion-spinner>\n  </div>\n  <div class="form">\n    <form [formGroup]="productForm" *ngIf="productForm">\n      <ion-list no-lines>\n        <ion-item>\n          <ion-label floating>{{\'Product Name\' | translate}}</ion-label>\n          <ion-input autocomplete="off" formControlName="product_name" type="text"></ion-input>\n        </ion-item>\n        <p class=\'error\' *ngIf="productForm && !productForm?.controls.product_name.valid  && (productForm.controls.product_name.dirty || submitAttempt)">Please write valid product name.</p>\n       <ion-item>\n          <ion-label>{{\'Unit\' | translate}}</ion-label>\n          <ion-select formControlName="product_unit">\n               <ion-option *ngFor="let item of unit_list" [value]="item.value">{{item.name}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <p class=\'error\' *ngIf="productForm && !productForm?.controls.product_unit.valid  && (productForm.controls.product_unit.dirty || submitAttempt)">Please write valid unit.</p>\n        <ion-item>\n            <ion-label floating>Unit Value</ion-label>\n            <ion-input autocomplete="off" formControlName="unit_value" type="text"></ion-input>\n        </ion-item>\n        <p class=\'error\' *ngIf="productForm && !productForm?.controls.unit_value.valid  && (productForm.controls.unit_value.dirty || submitAttempt)">Please write valid unit value.</p>\n      \n        <ion-item>\n          <ion-label floating>Sale Price</ion-label>\n          <ion-input autocomplete="off" formControlName="sale_price" type="text"></ion-input>\n        </ion-item>\n        <p class=\'error\' *ngIf="productForm && !productForm?.controls.sale_price.valid  && (productForm.controls.sale_price.dirty || submitAttempt)">Please write valid valid sale price.</p>\n      \n        <ion-item>\n            <ion-label floating>{{\'MRP\' | translate}}</ion-label>\n            <ion-input autocomplete="off" formControlName="product_mrp" type="text"></ion-input>\n        </ion-item>\n        <p class=\'error\' *ngIf="productForm && !productForm?.controls.product_mrp.valid  && (productForm.controls.product_mrp.dirty || submitAttempt)">Please write valid MRP.</p>\n      \n        <ion-item>\n            <ion-label floating>{{\'Discounted Price\' | translate}}</ion-label>\n            <ion-input autocomplete="off" formControlName="discount_price" type="text"></ion-input>\n        </ion-item>\n        <p class=\'error\' *ngIf="productForm && !productForm?.controls.discount_price.valid  && (productForm.controls.discount_price.dirty || submitAttempt)">Please write valid discounted price.</p>\n      \n        <ion-item>\n          <ion-label class="clickEnableCls">In Stock</ion-label>\n          <ion-checkbox formControlName="in_stock"></ion-checkbox>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Description</ion-label>\n        <ion-textarea formControlName="description" rows="2"></ion-textarea>\n      </ion-item>\n      <p class=\'error\' *ngIf="productForm && !productForm?.controls.description.valid  && (productForm.controls.description.dirty || submitAttempt)">Please write valid description.</p>\n      <ion-item>\n        <div class="profile" (click)="file.click()" >\n          <p *ngIf="!product_image">Select Image</p>\n          <input hidden type="file" (change)="onSelImage($event.target.files)" #file placeholder="Profile Image" autocomplete="off">\n          <img *ngIf="product_image" [src]="product_image" /> \n          <!-- <div (click)="actionSheetFile()" class="profile_img center_img">\n              <img [src]="product_image || \'./../../assets/imgs/avatar.png\'" class="crop_img loading" onerror="this.onerror=null;this.src=\'assets/imgs/avatar.png\';" /> \n          </div>\n          <ion-icon (click)="actionSheetFile()" class="material-icons">camera_alt</ion-icon> -->\n      </div>\n      </ion-item>  \n    </ion-list>\n      <button ion-button block class="btn" (click)="addProduct()"> {{btnHeading | translate}}</button>\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\work\code_weight\everything_ionic_app\app\service_provider\src\pages\add-product\add-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]])
    ], AddProductPage);
    return AddProductPage;
}());

//# sourceMappingURL=add-product.js.map

/***/ })

},[276]);
//# sourceMappingURL=main.js.map