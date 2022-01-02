/**
 * 消費税込み金額計算機
 *
 * 要件：商品金額を入力し、数量を確定後「追加」ボタンを
 * 　　　クリックすると「お買い上げ(税込)」に追加され
 * 　　　合計金額(税込)が更新される。
 * 　　　軽減税率ボタンにチェックを入れると、
 * 　　　軽減税率が適用される。
 *
 * オプション：１，inputに入力し、追加後は入力欄を初期化。
 * 　　　　　　２，追加後は、軽減税率チェックも初期化。
 */

//htmlの#keigenCheckのcheckboxを変数keigenに代入
const keigen = document.getElementById("keigenCheck");
//htmlの#inputFieldを変数inputFieldに代入
const inputField = document.getElementById("inputField");
//htmlの#inputCountを変数inputCountに代入
const inputCount = document.getElementById("inputCount");
//htmlの#btnクリックボタンを変数btnに代入
const btn = document.getElementById("btn");
//htmlの#outPutField olを変数outPutFieldに代入
const outPutField = document.querySelector("#outPutField ol");
//htmlの#total pを変数totalに代入
const total = document.querySelector("#total p");
/**
 * ====================
 *     初期値設定
 * ====================
 */
//消費税率の初期設定
let tax = 10;
//軽減税率の初期設定
let keigenTax = 8;
//合計金額の初期値
let totalAmount = 0;

/**
 * ==================================
 *     商品金額×消費税の計算用の関数
 * ==================================
 */
function calcTax(price, tax) {
  const inputCountVal = inputCount.value;
  return Math.round((price + (price * tax) / 100) * inputCountVal);
}

/**
 * ==================================
 *    入力欄の全角を半角に変換用の関数
 * ==================================
 */
function hankaku2Zenkaku(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}

/**
 * ==================================
 *  合計金額のアップデート用の関数
 * ==================================
 */
function uppdateCalc(addList) {
  //合計金額に追加した商品金額を足す
  totalAmount += addList;
  //合計金額を更新
  total.innerHTML = totalAmount;
}

/**
 * ==================================
 *   関数の実行
 *   軽減税率のcheckboxが変化したら
 * ==================================
 */

keigen.addEventListener("change", () => {
  //軽減税率がチェックされたら
  if (keigen.checked) {
    //消費税率を軽減税率に変更
    tax = keigenTax;
  } else {
    //消費税率を10に変更
    tax = 10;
  }
});

/**
 * ==================================
 *   関数の実行
 * 　btnがクリックされたら
 * ==================================
 */

btn.addEventListener("click", () => {
  const inputText = document.getElementById("inputField").value;
  const inputA = hankaku2Zenkaku(inputText);
  if (!isNaN(inputA)) {
    const li = document.createElement("li");
    const resulut = calcTax(parseInt(inputA), tax);
    if (keigen.checked) {
      li.textContent = `${resulut}(軽)`;
    } else {
      li.textContent = resulut;
    }
    outPutField.appendChild(li);
    inputField.value = "";
    inputCount.value = 1;
    keigen.checked = false;
    uppdateCalc(resulut);
  } else {
    alert("半角数字を入力してください");
    inputText = "";
  }
});
