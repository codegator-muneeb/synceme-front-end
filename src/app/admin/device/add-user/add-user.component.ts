import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../services/user-service/user.service';
import { ScanHardwareService } from '../../../services/scan-hardware/scan-hardware.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DeviceService } from '../../../services/device-service/device.service';
import { DatePipe } from "@angular/common"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent {
  //login user
  user: any
  loadingRfid = false
  loadingFinger = false
  loadingUpdate = false

  //Default Variables
  defaultGender: string;
  defaultType = { id: -1, name: "" };
  defaultAccount = { id: -1, name: "" };
  defaultDivision = { id: -1, name: "" };
  defaultUnit = { id: -1, name: "" };
  defaultTeam = { id: -1, name: "" };
  defaultDept = { id: -1, name: "" };
  defaultPermissions = { id: -1, name: "" };

  //Properties for each input
  empid;
  rfid = "";
  finger = "";
  firstName;
  lastName;
  email;
  phone1;
  phone2;
  dob;
  bloodGroup = "";
  address;
  city;
  country;
  pincode;
  selectedDeviceList;
  aadharNo;

  //Arrays for dropdown
  empTypes: any;
  accounts: any;
  divisions: any;
  units: any;
  teams: any;
  depts: any;
  permissions: any;
  genders = ['Male', 'Female', 'Not Specified'];
  devices: any

  constructor(private authService: NbAuthService,
    private deviceService: DeviceService,
    private userService: UserService,
    private scanService: ScanHardwareService,
    private toastrService: NbToastrService,
    private datepipe: DatePipe,
    private hardwareService: ScanHardwareService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.deviceService.getRegisteredDevices(this.user.companyCode)
      .subscribe((response) => {
        this.devices = response
      },
        (error) => console.log("Couldn't get device list"));


    this.userService.getOfficialEntity(this.user.companyCode, "empTypes")
      .subscribe((response) => {
        this.empTypes = response
      },
        (error) => console.log("Couldn't get emp Types list"));

    this.userService.getOfficialEntity(this.user.companyCode, "account")
      .subscribe((response) => {
        this.accounts = response
      },
        (error) => console.log("Couldn't get account list"));

    this.userService.getOfficialEntity(this.user.companyCode, "division")
      .subscribe((response) => {
        this.divisions = response
      },
        (error) => console.log("Couldn't get division list"));

    this.userService.getOfficialEntity(this.user.companyCode, "unit")
      .subscribe((response) => {
        this.units = response
      },
        (error) => console.log("Couldn't get unit list"));

    this.userService.getOfficialEntity(this.user.companyCode, "dept")
      .subscribe((response) => {
        this.depts = response;
      },
        (error) => console.log("Couldn't get dept list"));

    this.userService.getOfficialEntity(this.user.companyCode, "permission")
      .subscribe((response) => {
        this.permissions = response
      },
        (error) => console.log("Couldn't get permissions list"));

    this.userService.getOfficialEntity(this.user.companyCode, "teams")
      .subscribe((response) => {
        this.teams = response
      },
        (error) => console.log("Couldn't get teams list"));

  }

  populateRfid() {
    this.loadingRfid = true;
    this.scanService.getId(this.user.companyCode).subscribe((response) => {
      this.checkAssignRfid(response);
      this.loadingRfid = false;
    },
      (error) => {
        console.log(error)
        this.loadingRfid = false;
      });
  }

  checkAssignRfid(response) {
    if (typeof response !== "undefined") {
      this.rfid = response.rfid
    } else {
      console.log("Current Value not received")
    }
  }

  populateFinger() {
    this.loadingFinger = true;
    this.scanService.getId(this.user.companyCode).subscribe((response) => {
      this.checkAssignFinger(response);
      this.loadingFinger = false;
    },
      (error) => {
        console.log(error)
        this.loadingFinger = false;
      });
  }

  checkAssignFinger(response) {
    if (typeof response !== "undefined") {
      this.finger = response.finger
    } else {
      console.log("Current Value not received")
    }
  }

  addUser() {
    this.loadingUpdate = true;
    var deviceIdList = this.selectedDeviceList.map(device => device.deviceId);
    var userDetails = {
      "empid": `${this.user.companyCode}${this.empid}`,
      "rfid": this.rfid,
      "finger": this.finger,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "phone1": typeof this.phone1 !== "undefined" ? Number(this.phone1) : 0,
      "phone2": typeof this.phone2 !== "undefined" ? Number(this.phone2) : 0,
      "dob": this.datepipe.transform(this.dob, "yyyyMMdd"),
      "gender": this.defaultGender,
      "bloodGroup": this.bloodGroup,
      "address": this.address,
      "city": this.city,
      "country": this.country,
      "pincode": typeof this.pincode !== "undefined" ? Number(this.pincode) : 0,
      "employeeType": Number(this.defaultType.id),
      "account": 1,
      "division": Number(this.defaultDivision.id),
      "unit": Number(this.defaultUnit.id),
      "team": Number(this.defaultTeam.id),
      "department": Number(this.defaultDept.id),
      "permission": Number(this.defaultPermissions.id),
      "deviceList": deviceIdList,
      "aadhar": typeof this.aadharNo === "undefined" || this.aadharNo === "" ? "-" : this.aadharNo
    }

    var userMqttObject = [{
      "empid": `${this.user.companyCode}${this.empid}`,
      "rfid": this.rfid,
      "fingerid": this.finger
    }];

    this.hardwareService.addUser(userMqttObject, deviceIdList)
      .subscribe((response) => {

        this.userService.addUserToDatabase(this.user.companyCode, userDetails)
          .subscribe((result) => {
            this.loadingUpdate = false;
            this.showToast(NbToastStatus.SUCCESS, "Success", "Succesfully Done!")
            this.reset()
          },
            (dberror) => {
              this.loadingUpdate = false;
              this.showToast(NbToastStatus.DANGER, "Error", "Error Occured!")
            });

      },
        (error) => {
          this.loadingUpdate = false;
          this.showToast(NbToastStatus.DANGER, "Error", "Error Occured!")
        });

  }

  isEnabled() {
    return (typeof this.empid !== "undefined" && (this.rfid !== "" || this.finger !== "") &&
      typeof this.firstName !== "undefined" && typeof this.lastName !== "undefined" && typeof this.email !== "undefined" &&
      typeof this.dob !== "undefined" && typeof this.address !== "undefined" && typeof this.city !== "undefined" &&
      typeof this.country !== "undefined" && (typeof this.selectedDeviceList !== "undefined" && this.selectedDeviceList !== []) &&
      typeof this.defaultGender !== "undefined" && this.defaultType.name !== "" &&
      this.defaultDivision.name !== "" && this.defaultUnit.name !== "" && this.defaultTeam.name !== "" &&
      this.defaultDept.name !== "" && this.defaultPermissions.name !== "") &&
      (this.empid !== "" && this.firstName !== "" && this.lastName !== "" && this.email !== "" &&
        this.dob !== "" && this.address !== "" && this.city !== "" &&
        this.country !== "" && this.selectedDeviceList !== "") && this.defaultGender !== ""
  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? title : '';

    this.toastrService.show(
      body,
      titleContent,
      config);
  }

  reset() {
    this.empid = ""; this.rfid = ""; this.finger = "";
    this.firstName = ""; this.lastName = ""; this.email = "";
    this.phone1 = ""; this.phone2 = ""; this.dob = "";
    this.bloodGroup = ""; this.address = ""; this.city = "";
    this.country = ""; this.pincode = ""; this.selectedDeviceList = [];
    this.defaultGender = ""; this.defaultType = { id: -1, name: "" };
    this.defaultDivision = { id: -1, name: "" }; this.defaultUnit = { id: -1, name: "" }; this.defaultTeam = { id: -1, name: "" };
    this.defaultDept = { id: -1, name: "" }; this.defaultPermissions = { id: -1, name: "" };
  }
}
