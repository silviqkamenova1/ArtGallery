const { paymentMethodsMap } = require('../constants')


exports.getPaymentDataViewData = (selectedPaymentMethod) => {
    const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({ 
        value: key, 
        label: paymentMethodsMap[key],
        isSelected: selectedPaymentMethod == key
    }))

    return paymentMethods
}