async function getHoliday() {

  const year =
    document.getElementById("year").value;

  const month =
    document.getElementById("month").value;

  const url =
    `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo` +
    `?serviceKey=네인증키` +
    `&solYear=${year}` +
    `&solMonth=${month}` +
    `&_type=json`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    const items =
      data.response.body.items.item;

    let html = "";

    if (!items) {

      html = "<p>공휴일 없음</p>";

    } else {

      items.forEach(item => {

        html += `
          <div class="item">
            <h3>${item.dateName}</h3>
            <p>${item.locdate}</p>
          </div>
        `;
      });
    }

    document.getElementById("result").innerHTML =
      html;

  } catch(error) {

    console.error(error);

    alert("오류 발생");
  }
}
