import React from 'react';
export default class InsuranceCompanyConstants {
  static ALPHA_INS = 1001;
  static INGOS_INS = 1002;
  static ROSGOS_INS = 1003;
  static VSK_INS = 1004;
  static RESO_INS = 1005;
  static SOGAZ_INS = 1006;
  static MAKS_INS = 1007;
  static RENESANS_INS = 1008;
  static CAPITAL_LIFE_INS = 1009;
  static SOGLASIE_INS = 1010;
  static SBER_INS = 1011;
  static TINKOFF_INS = 1012;
  static CUSTOM_INS = 2001;
  static getImage(item) {
    if (item) {
      switch (item.company_id) {
        case InsuranceCompanyConstants.ALPHA_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/alfa_strah.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.INGOS_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/ingosstrah.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.ROSGOS_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/rosgosstrah.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.VSK_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/vsk.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.RESO_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/reso.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.SOGAZ_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "shield",
            src: require('../assets/icons/shield.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.MAKS_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/maks.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.RENESANS_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/renessans.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.CAPITAL_LIFE_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/caplife.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.SOGLASIE_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/insurance/soglasie.svg').default,
            alt: ""
          });
        case InsuranceCompanyConstants.SBER_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/banks/sber.png'),
            alt: ""
          });
        case InsuranceCompanyConstants.TINKOFF_INS:
          return /*#__PURE__*/React.createElement("img", {
            className: "insurance",
            src: require('../assets/banks/tinkoff.png'),
            alt: ""
          });
        case InsuranceCompanyConstants.CUSTOM_INS:
        default:
          return /*#__PURE__*/React.createElement("img", {
            className: "shield",
            src: require('../assets/icons/shield.svg').default,
            alt: ""
          });
      }
    }
  }
}