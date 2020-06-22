<template>
    <div class="main__block">
        <Header></Header>
        <div class="main__block--ecommerce">
            <div class="main__block--form">
                <div class="main__block--form-header">
                    <span>Get Your Car Insurance For $9.99</span>
                </div>
                <div class="main__block--form-content">
                    <form @submit.prevent="submitForm">
                        <div class="main__block--form-group">
                            <div class="main__block--form-content-box">
                                <span class="label">Full Name</span>
                                <input type="text" class="core-input" v-model="fullName">
                                <span v-if="errors.fullNameErr" class="error-message">{{errors.fullNameErr}}</span>
                            </div>
                            <div class="main__block--form-content-box">
                                <span class="label">Email</span>
                                <input type="email" class="core-input" v-model="email">
                                <span v-if="errors.emailErr" class="error-message">{{errors.emailErr}}</span>
                            </div>
                            <div class="main__block--form-content-box relative">
                                <span class="label">Zip Code</span>
                                <input type="text" class="core-input zipcode" v-model="zipCode" placeholder="10001">
                                <span class="markerPosition">
                                    <font-awesome-icon icon="map-marker-alt" class="lock-icon icon-color"/>
                                </span>
                                <span v-if="errors.zipCodeErr" class="error-message">{{errors.zipCodeErr}}</span>
                            </div>
                            <div class="main__block--form-content-box">
                                <span class="label">Birth Date</span>
                                <birth-datepicker v-model="date" />
                                <span v-if="errors.dateErr" class="error-message">{{errors.dateErr}}</span>
                            </div>
                            <div class="main__block--form-content-box">
                                <span class="label">Gender</span>
                                <div class="main__block--gender">
                                    <div class="gender cursor" @click="setFemale" :class="{female: female}">Female</div>
                                    <div class="gender cursor" @click="setMale" :class="{male: male}">Male</div>
                                </div>
                                <span v-if="errors.genderErr" class="error-message">{{errors.genderErr}}</span>
                            </div>
                            <div class="main__block--card-info">
                                <div class="main__block--form-content-box">
                                    <span class="label">Card Holder Name</span>
                                    <input type="text" class="core-input" v-model="cardName">
                                    <span v-if="errors.cardNameErr" class="error-message">{{errors.cardNameErr}}</span>
                                </div>
                                <div class="main__block--form-content-box relative">
                                    <span class="label">Card Number</span>
                                    <input type="text" class="core-input" v-model="cardNumber">
                                    <span v-if="!cardType" class="lockPosition">
                                        <font-awesome-icon icon="lock" class="lock-icon icon-color"/>
                                    </span>
                                    <span class="cardType">{{cardType}}</span>
                                    <span v-if="errors.cardNumberErr" class="error-message">{{errors.cardNumberErr}}</span>
                                </div>
                                <div class="main__block--additional-block">
                                    <div>
                                        <span class="label">Expiration Date</span>
                                        <input type="text" class="input" placeholder="MM/YY" v-model="cardExpiration" maxlength="5">
                                        <span v-if="errors.cardExpirationErr" class="error-message">{{errors.cardExpirationErr}}</span>
                                    </div>
                                    <div class="relative">
                                        <span class="label">CVV</span>
                                        <input type="text" class="input" v-model="cardCvv" maxlength="4">
                                        <div class="cvvPosition">
                                            <span class="cvvExplanation">You can find your <span class="bold">CVV</span> at the back of your credit card.</span>
                                            <font-awesome-icon icon="question-circle" class="lock-icon icon-color cursor"/>    
                                        </div>
                                        
                                        <span v-if="errors.cardCvvErr" class="error-message">{{errors.cardCvvErr}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="main__block--continue">
                                <button class="continue-btn cursor">CONTINUE</button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
            <div class="main__block--router-links">
                <div class="main__block--additional-links-rule">
                    <router-link to="/About" class="link cursor">About Us</router-link>
                    <router-link to="/Privacy" class="link cursor">Privacy Policy</router-link>
                    <router-link to="/Terms" class="link cursor">Terms Of Use</router-link>
                </div>
            </div>
            <div class="main__block--copyrights">
                <span>&copy; All Rights Reserved.</span>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "./Header";
import axios from 'axios';
import birthDatepicker from 'vue-birth-datepicker/src/birth-datepicker';

const cardRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const zipCodeRegex = /^\d{5}$|^\d{5}-\d{4}$/;
const cvvRegex = /^[0-9]{3,4}$/;

export default {
    name: "Form",
    data() {
        return {
            cardName: '',
            cardNumber: '',
            cardExpiration: '',
            cardCvv: '',
            fullName: '',
            email: '',
            zipCode: '',
            date: '',
            cardType: '',
            errors: {
                    fullNameErr: '',
                    emailErr: '',
                    zipCodeErr: '',
                    genderErr: '',
                    dateErr: '',
                    cardNameErr: '',
                    cardNumberErr: '',
                    cardExpirationErr: '',
                    cardCvvErr: ''
                }  
            ,
            female: false,
            male: false,
            userInfo: {
                name: String,
                email: String,
                zCode: Number,
                gender: String,
                birthDay: Number,
                userCreditCard: {
                    cardName: String,
                    cardNumber: Number,
                    cardExpiration: Number,
                    cardCvv: Number
                }
            },
            user: [],
        }
    },
    methods: {
        submitForm() {
            this.errors = {};
            this.validateFullName(this.fullName);
            this.validateEmail(this.email);
            this.validateZipCode(this.zipCode);
            this.checkBirthDay(this.date);
            this.checkGender();
            this.cardValidation();
            if(Object.keys(this.errors).length === 0) {
                alert("Form submitted successfuly!")
                let myJson = JSON.stringify(this.userInfo);
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    userInfo: myJson
                })
                .then(response => {
                    console.log(response)
                })
                
            } else {
                alert("Please fill up the form correctly")
            }
        },
        validateFullName(name) {
            if (name.length >= 3) {
                this.userInfo.name = name;
            } else if (name.length == 0) {
                this.errors.fullNameErr = "Full name is required"
            } else {
                this.errors.fullNameErr = "Full name is too short!"
            }
        },
        validateEmail(email) {
           if (emailRegex.test(email)) {
               this.userInfo.email = email;
           } else {
               this.errors.emailErr = "Valid email is required";
           }    
        },
        validateZipCode(zipCode) {
            if (zipCodeRegex.test(zipCode)) {
                this.userInfo.zCode = zipCode;
            } else {
                this.errors.zipCodeErr = "Valid zipcode is required";
            }
        },
        checkBirthDay(date){
            if(date) {
                this.formatDate(date);
            } else  {
                this.errors.dateErr = "Date is required"
            }
        },
        formatDate(date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
                let myDate = [year, month, day].join('-');
            this.userInfo.birthDay = myDate;
        },
        setFemale() {
            this.female = !this.female;
            this.male = false;
            if(this.female) {
                this.userInfo.gender = "female";
            }
        },
        setMale() {
            this.male = !this.male;
            this.female = false;
            if (this.male) {
                this.userInfo.gender = "male";
            }
        },
        checkGender() {
            if(!this.male && !this.female) {
                this.errors.genderErr = "Gender must be selected";
            }
        },
        cardValidation() {
            this.cardNameValidation(this.cardName);
            this.cardNumberValidation(this.cardNumber);
            this.cardExpirationValidation(this.cardExpiration);
            this.cardCvvValidation(this.cardCvv);
        },
        cardNumberValidation(cardNumber) {
            if(cardRegex.test(cardNumber)) {
                this.userInfo.userCreditCard.cardNumber = cardNumber;
            } else {
                this.errors.cardNumberErr = "Valid card number is required";
            }
        },
        cardNameValidation(cardName) {
            if(cardName.length >= 1) {
                this.userInfo.userCreditCard.cardName = cardName;
            } else {
                this.errors.cardNameErr = "Valid card holder full name is required";
            } 
        },
        cardCvvValidation(cvv) {
            if(cvvRegex.test(cvv)) {
                this.userInfo.userCreditCard.cardCvv = cvv;
            } else {
                this.errors.cardCvvErr = "Valid card CVV is required";
            }
        },
        cardExpirationValidation(date) {
            if (date.length == 5) {
                let month = date.slice(0, 2);
                let year = date.slice(3, 5);
                let today = new Date();
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = today.getFullYear();
                today = mm + "/" + yyyy;
                let currentMonth = today.slice(0, 2);
                let currentYear = today.slice(5, 7);

                if (year > currentYear) {
                    this.userInfo.userCreditCard.cardExpiration = month + "/" + year;
                } else if (year == currentYear) {
                    if (month > currentMonth) {
                        this.userInfo.userCreditCard.cardExpiration = month + "/" + year;
                    } else if (month == currentMonth){ 
                        this.errors.cardExpirationErr = "Your card might be expired";
                    } else  {
                         this.errors.cardExpirationErr = "Your card is expired";
                    }
                } else {
                    this.errors.cardExpirationErr = "Your card is expired";
                }
                
            } else {
                this.errors.cardExpirationErr = "Valid date is required. MM/YY";
            }
        },
        GetCardType(number) {
            // visa
            var re = new RegExp("^4");
            if (number.match(re) != null)
                this.cardType = "Visa";

            // Mastercard 
            // Updated for Mastercard 2017 BINs expansion
            if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
                this.cardType = "MasterCard";

            // AMEX
            re = new RegExp("^3[47]");
            if (number.match(re) != null)
                this.cardType = "AMEX";

            // Discover
            re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
            if (number.match(re) != null)
                this.cardType = "Discover";

            // Diners
            re = new RegExp("^36");
            if (number.match(re) != null)
                this.cardType = "Diners";

            // Diners - Carte Blanche
            re = new RegExp("^30[0-5]");
            if (number.match(re) != null)
                this.cardType = "Diners - Carte Blanche";

            // JCB
            re = new RegExp("^35(2[89]|[3-8][0-9])");
            if (number.match(re) != null)
                this.cardType = "JCB";

            // Visa Electron
            re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
            if (number.match(re) != null)
               this.cardType =  "Visa Electron";

        }
    }, 
    components: {
        Header, birthDatepicker
    },
    watch: {
        cardNumber() {
            this.GetCardType(this.cardNumber);
        }
    }
}
</script>
<style lang="scss" scoped>
.main__block {
    &--header {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.0890243);
        height: 60px;
        font-size: 21px;
        color: #1673E0;
        font-weight: 700;
        margin-bottom: 30px;
    }

    &--ecommerce {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    &--form { 
        width: 600px;
        height: auto;
        border: 1px solid #E3E3E3;
        border-radius: 6px;
        padding: 20px 0 36px;
        margin-bottom: 20px;
    }

    &--form-header {
        font-weight: 600;
        font-size: 22px;
        display: flex;
        justify-content: center;
        color: #105492;
        margin-bottom: 15px;
    }

     &--form-group {
        display: flex;
        flex-flow: column;
    }

    &--form-content {
        padding: 0 131px 0 141px;
        display: flex;
        flex-flow: column;
    }

    &--form-content-box { 
        display: flex;
        flex-flow: column;
        margin-bottom: 20px;
    }

    &--selector {
        display: flex;
        justify-content: space-between;
    }

    &--gender  {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    &--card-info {
        display: flex;
        border: 1px solid red;
        justify-content: center;
        height: auto;
        border: 1px solid #E2E2E2;
        border-radius: 4px;
        background: #FAFAFA;
        flex-flow: column;
        padding: 15px 24px;
        margin-bottom: 20px; 

        .main__block--form-content-box {
            margin-bottom: 15px !important;
        }
    }

    &--additional-block {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    &--continue {
        height: 53px;
        border-radius: 3px;
        background: #15832F;
        width: 100%;
    }

    &--router-links {
        width: 328px;
        margin-bottom: 20px;
    }

    &--additional-links-rule {
        display: flex;
        justify-content: space-around;
    }

    &--copyrights {
        font-size: 14px;
        color: #898989;
        margin-bottom: 20px;
    }
}
</style>