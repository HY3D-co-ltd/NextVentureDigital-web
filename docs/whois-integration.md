# Next.js 프로젝트와 후이즈(Whois) 연동 가이드

본 문서는 `NextVentureDigital-web` 프로젝트를 **GitHub Pages**에 호스팅한 후, **후이즈(Whois)**에서 구매한 개인 도메인(`www.nexventuredigital.com`)을 연결하기 위한 단계별 가이드와 중요 주의사항을 담고 있습니다.

---

## 1. 🚨 필수 확인: Next.js 경로 깨짐 리스크 및 해결책

현재 프로젝트는 GitHub Pages의 기본 주소(`https://hy3d-co-ltd.github.io/NextVentureDigital-web/`)에 맞추기 위해 서브 경로 설정을 사용하고 있습니다. 
후이즈 도메인을 연결하여 루트 경로(`https://www.nexventuredigital.com/`)로 바로 접속하게 되면, **기존 설정 때문에 이미지와 스타일(CSS) 등이 전부 깨지는 치명적인 리스크가 발생합니다.**

### 🛠️ 해결 방법: `next.config.mjs` 수정
도메인을 연동하기 전, `next.config.mjs` 파일에서 `basePath` 설정을 변경하거나 제거해야 합니다.

* **기존 설정 ([next.config.mjs](file:///d:/Dev/NextVentureDigital-web/next.config.mjs))**:
  ```javascript
  basePath: '/NextVentureDigital-web',
  ```
* **수정 후 설정 (도메인 적용 시)**:
  `basePath`를 빈 문자열(`""`)로 설정하거나 아예 삭제합니다.
  ```javascript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'export',
    // basePath: '/NextVentureDigital-web', <-- 주석 처리 또는 삭제
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  };

  export default nextConfig;
  ```
> [!IMPORTANT]
> 이 설정을 수정하여 GitHub에 push 및 재배포한 뒤에 아래 도메인 연결 단계를 진행해야 웹사이트가 깨지지 않고 깔끔하게 열립니다.

---

## 2. 🛠️ 후이즈(Whois) DNS 설정 단계

GitHub Pages 서버가 후이즈 도메인을 인식할 수 있도록 IP 주소와 레코드를 설정해야 합니다.

### 1단계: 후이즈 로그인 및 도메인 관리
1. [후이즈](https://whois.co.kr/)에 로그인합니다.
2. **[내 도메인 관리]** 메뉴로 이동하여 사용할 도메인을 선택합니다.
3. **[네임서버(DNS) 관리]** > **[고급설정 (네임서버 호스팅 서비스)]** 또는 **[네임서버 고급설정]** 메뉴로 들어갑니다.

### 2단계: DNS 레코드 설정
구매하신 도메인을 두 가지 형태(`A 레코드` 및 `CNAME 레코드`)로 모두 작동하도록 설정하는 것이 좋습니다.

#### ① 루트 도메인 설정 (A 레코드)
* `nexventuredigital.com` (www가 붙지 않은 주소)으로 접속했을 때 GitHub Pages로 가도록 연결합니다.
* **IP 주소(A 레코드)** 추가 메뉴에서 아래의 **GitHub Pages 공식 IP 4개**를 각각 한 줄씩 추가합니다:
  * **`185.199.108.153`**
  * **`185.199.109.153`**
  * **`185.199.110.153`**
  * **`185.199.111.153`**

#### ② 서브 도메인 설정 (CNAME 레코드)
* `www.nexventuredigital.com` 주소로 접속했을 때 처리하기 위한 레코드입니다.
* **CNAME 설정** 메뉴에서 다음과 같이 입력합니다:
  * **호스트 이름**: `www`
  * **값 (도메인 주소)**: `hy3d-co-ltd.github.io.` (GitHub Pages 도메인 입력, 맨 뒤에 온점`.`을 찍어야 하는 시스템이 있으니 입력 칸 가이드 참고)

---

## 3. 🛠️ GitHub 저장소(Repository) 설정 단계

후이즈에서 DNS 세팅을 끝낸 후, GitHub 저장소에 어떤 도메인을 쓸 것인지 선언해야 합니다.

### 1단계: GitHub Settings 설정
1. GitHub의 본 프로젝트 저장소(`NextVentureDigital-web`)로 이동합니다.
2. 상단 메뉴에서 **[Settings]** 탭을 클릭합니다.
3. 왼쪽 사이드바에서 **[Pages]** 메뉴를 선택합니다.
4. **Custom domain** 입력 란에 구매한 도메인 주소(`www.nexventuredigital.com`)를 입력하고 **[Save]** 버튼을 누릅니다.

### 2단계: HTTPS 활성화 (중요 보안 설정)
1. 도메인을 저장하고 몇 분 정도 지나면 GitHub가 DNS 설정을 검증합니다.
2. 검증이 통과되면 Custom domain 입력 창 아래에 **[Enforce HTTPS]** 체크박스가 활성화됩니다.
3. **[Enforce HTTPS]**를 반드시 체크해 줍니다. (보안 연결 SSL 인증서 자동 발급)

---

## 4. 요약 체크리스트 (순서 중요!)

1. [ ] **코드 수정**: `next.config.mjs`에서 `basePath` 제거 후 GitHub에 Push
2. [ ] **후이즈 설정**: A 레코드 4개 등록 및 `www` CNAME 등록
3. [ ] **GitHub 설정**: 저장소 Settings -> Pages에서 Custom domain에 도메인 등록 및 `Enforce HTTPS` 체크
4. [ ] **검증**: 약 10분~1시간 뒤 도메인으로 접속하여 CSS/이미지가 깨지지 않고 잘 로드되는지 확인
