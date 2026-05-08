async function searchHoliday() {

  const year =
    document.getElementById("year").value;

  const month =
    document.getElementById("month").value;

  const serviceKey =
    "ad45fb2710a84c1d182b19ee083b656290d8d385860bd75c7c1ac35d83ad195c";

  const url =
    `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo` +
    `?serviceKey=${serviceKey}` +
    `&solYear=${year}` +
    `&solMonth=${month}`;

  try {

    const response = await fetch(url);

    const text = await response.text();

    const parser = new DOMParser();

    const xml =
      parser.parseFromString(text, "text/xml");

    const items =
      xml.getElementsByTagName("item");

    const result =
      document.getElementById("result");

    result.innerHTML = "";

    for (let item of items) {

      const name =
        item.getElementsByTagName("dateName")[0]?.textContent;

      const date =
        item.getElementsByTagName("locdate")[0]?.textContent;

      result.innerHTML += `
        <div class="card">
          <h3>${name}</h3>
          <p>${date}</p>
        </div>
      `;
    }

  } catch(error) {

    console.error(error);

    alert("오류 발생");
  }
}
