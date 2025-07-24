// utils/paymentUtils.ts

export type SendType =
  | '0' // 信用卡
  | '1' // 銀聯卡
  | '2' // 超商條碼
  | '3' // WebATM
  | '4' // 虛擬帳號
  | '6' // 超商代碼
  | '7'; // LinePay

export interface PaymentFormPayload {
  sendType?: SendType;
  orderNumber: string;
  totalAmount: string;
  buyerName?: string;
  buyerPhone?: string;
  buyerEmail?: string;
  buyerMemo?: string;
  callbackUrl?: string;
  returnUrl?: string;
}

export const appendHiddenInput = (
  form: HTMLFormElement,
  name: string,
  value: string
) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
};

export const submitPaymentForm = (payload: PaymentFormPayload) => {
  const sendType = payload.sendType || '0'; // 預設為信用卡

  const form = document.createElement('form');
  form.action = import.meta.env.VITE_PAYMENT_GATEWAY_URL;
  form.method = 'post';

  // 通用欄位
  appendHiddenInput(form, 'Send_Type', sendType);
  appendHiddenInput(form, 'Pay_Mode_No', '2');
  appendHiddenInput(
    form,
    'CustomerId',
    import.meta.env.VITE_PAYMENT_CUSTOMER_ID
  );
  appendHiddenInput(form, 'Order_No', payload.orderNumber);
  appendHiddenInput(form, 'Amount', payload.totalAmount);

  // 信用卡專屬欄位
  if (sendType === '0') {
    appendHiddenInput(form, 'TransMode', '1');
    appendHiddenInput(form, 'Installment', '0');
    appendHiddenInput(form, 'TransCode', '00');
    appendHiddenInput(form, 'Buyer_Memo', payload.buyerMemo || '商品購買');
    appendHiddenInput(
      form,
      'Return_url',
      payload.returnUrl || `${window.location.origin}/PaymentCB`
    );
  } else {
    // 其他類型：虛擬帳號、條碼、WebATM 等
    appendHiddenInput(form, 'Buyer_Name', payload.buyerName || '');
    appendHiddenInput(form, 'Buyer_Telm', payload.buyerPhone || '');
    appendHiddenInput(form, 'Buyer_Mail', payload.buyerEmail || '');
    appendHiddenInput(form, 'Buyer_Memo', payload.buyerMemo || '購物付款');
    appendHiddenInput(
      form,
      'Callback_Url',
      payload.callbackUrl ||
        'https://api.onemorelottery.tw:8081/payment/paymentCallback'
    );
  }

  document.body.appendChild(form);
  form.submit();
};
