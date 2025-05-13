import nanjinglogo from "../../assets/nanjing.png";

const universitiesData = [
  {
    id: 1,
    name: "Jiangsu Medical University",
    country: "China",
    image:'https://n.17gz.org/upload/image/2021/09_10/LOGIN_IMAGES/c3dcd16ed7d54ec5b80bf2688675c2f8.jpg?token=6f60ff88ecae1d7e236892d0bcc65422196cb582786',
    address: "China, Jiang Su Sheng, Zhen Jiang Shi, Jing Kou Qu, 226000",
    ranking: "341",
    tuition: `- USD 2,500–5,400 per year`,
    costOfLiving: `- USD 170–290 /month`,
    monthlyStipend:`
    - ¥2,500/month for Bachelors,
    - ¥3,000/month for Master,
    - ¥3,500/month for PhD`,
    programs: [
    "MBBS (Clinical Medicine)",
    "Chemical Engineering",
    "Mechanical Design",
    "Civil Engineering",
    "Business Administration",
    "International Economics & Trade",
    "Pharmacy"
    ],
    website: 'https://ju.17gz.org/',
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0a/Jiangsu_University_logo.png",
    description: `
    ### Why Study Medicine at Jiangsu University School of Medicine, China
    
    #### Brief Introduction:
    Jiangsu University School of Medicine is an important part of Jiangsu University specialized in medical science. Jiangsu University was founded by combining the former Jiangsu University of Science and Technology (a key university), Zhenjiang Medical College, and Zhenjiang Teachers’ College with the approval of the Ministry of Education of China in August 2001. It is a teaching-and-research-oriented comprehensive university and one of the Top Universities in China. Jiangsu University was one of the first universities to offer doctoral programs.

    #### 1. History Briefs:
    - Founded as Jiangsu Provincial Medical College in 1934
    - Renamed to Zhenjiang Medical College in 1984
    - Merged with Jiangsu University in 2001 and renamed to Jiangsu University School of Medicine

    #### 2. Campus Overview:
    Jiangsu University School of Medicine is situated in Zhenjiang, a historically and culturally renowned city. The school covers an area of 2030,000 m² and has a building area of more than 1400,000 m². The campus is well-equipped for international students to study medicine.

    #### 3. Discipline Construction and Achievements:
    The university has approximately 300 full-time teachers, including 110 professors and 190 associate professors. The university offers five disciplines that confer Master's and Doctoral degrees. These include Clinical Laboratory Science, Immunology, Pathogenic Biology, Human Anatomy, Histology Embryology, and Physiology. 

    The discipline of Clinical Laboratory Science has become a renowned major in Jiangsu Province. Jiangsu University School of Medicine has more than 40 National Natural Science Funds and has published over 400 research papers.

    #### 4. Affiliated Hospitals:
    Jiangsu University School of Medicine has over 80 affiliated hospitals and teaching hospitals for international medical students to undertake internships and clinical rotations. One of the key hospitals is the Affiliated Hospital of Jiangsu University (Zhenjiang Jiangbin Hospital), founded in 1936. It is a level three first-class hospital with modern infrastructure and a broad scope of medical services.

    #### 5. International Student Education:
    The university offers English Medium Programs for international students in Medical Bachelor/Undergraduate (including MBBS), Master/Postgraduate, and Doctoral/PhD programs. The university provides a robust scholarship system for international students.

    #### Communication and Cooperation:
    Jiangsu University School of Medicine maintains long-term cooperative relationships with 67 universities and educational institutions across the world. These include universities from the USA, UK, Germany, Australia, Japan, Russia, and other countries.
  `
},
{
  id: 2,
  name: "Central South University",
  country: "China",
  image: "https://en.csu.edu.cn/images/Dundee_banner_3.jpg",
  address: "932 Lushan S Rd, Yue Lu Qu, Chang Sha Shi, Hu Nan Sheng, China, 410017",
  ranking: "351",
  tuition: `- USD 3,000–6,000 per year (varies by program)`,
  costOfLiving: `- USD 200–400 /month`,
  monthlyStipend: `
  - ¥2,000–¥3,500/month (depending on program & scholarship)`,
  programs: [
    "Clinical Medicine (MBBS)",
    "Materials Science & Engineering",
    "Mining Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Environmental Engineering",
    "Computer Science"
  ],
  website: "http://en.csu.edu.cn/",
  logo: "https://www.researchgate.net/publication/338246716/figure/fig2/AS:841997615112192@1577759283419/Logo-of-Central-South-University.jpg",
  description: `
  ### Why Study at Central South University, China
  
  #### Brief Introduction:
  Central South University (CSU) is a comprehensive and research-oriented university located in Changsha, the capital of Hunan Province, China. Established in 2000 through the merger of three prestigious institutions, CSU has become a leading hub of innovation and academic excellence, especially in engineering, medicine, and business.

  #### 1. History Briefs:
  - Founded through a merger in 2000 of: Central South University of Technology, Xiangya Medical University, and Hunan Medical University.
  - Historical roots trace back to the first engineering school in Hunan in 1903.
  - CSU consistently ranks among China’s Top 10 universities and in the Top 100 globally.

  #### 2. Campus Overview:
  CSU’s campus covers over 200 hectares in Changsha — a vibrant and fast-growing city. The university features modern teaching facilities, research labs, libraries, sports centers, and green spaces, offering an ideal environment for academic and personal growth.

  #### 3. Discipline Construction and Achievements:
  Known for its excellence in:
  - Materials Science
  - Mining & Mechanical Engineering
  - Medicine & Public Health
  - Business & Management

  CSU is recognized nationally and internationally for research output and innovation, contributing significantly to China’s technological and scientific progress.

  #### 4. Affiliated Hospitals:
  - CSU boasts several affiliated hospitals, most notably **Xiangya Hospital**, one of China’s oldest and most prestigious.
  - Xiangya Hospital provides top-tier medical education, research, and healthcare services with modern medical technologies.

  #### 5. International Student Education:
  CSU offers full English-medium degree programs (Bachelor’s, Master’s, and PhDs) across engineering, medical, business, and social science disciplines.
  Scholarships and financial aid are available to outstanding international students.

  #### Communication and Cooperation:
  Central South University partners with over 200 universities worldwide. Its international collaborations span academic exchange, joint research, and student mobility with institutions in the USA, UK, Germany, Australia, Japan, and more.
  `
},
{
  id: 3,
  name: "Nanjing Medical University",
  country: "China",
  video: "https://english.njmu.edu.cn/_upload/article/videos/74/91/3a4bfd4e460f88099acf73b7e372/06a9330a-edf0-41c2-b5d2-f02a7b44505e.mp4",
  image: "https://www.riaoverseas.com/wp-content/uploads/2020/02/1981078584Nanjing_Medical_University_-_Copy.jpg",
  address: "140 Hanzhong Rd, Gu Lou Qu, Nan Jing Shi, Jiang Su Sheng, China, 210029",
  ranking: "601–650 (QS World University Rankings 2024)",
  tuition: "- USD 3,000–6,000 per year (varies by program)",
  costOfLiving: "- USD 350–500 /month",
  monthlyStipend: `
  - ¥2,000–¥3,500/month (based on scholarship type and program)`,
  programs: [
    "MBBS (Clinical Medicine)",
    "Biomedical Sciences",
    "Public Health",
    "Medical Technology",
    "Pharmacology",
    "Immunology",
    "Traditional Chinese Medicine"
  ],
  website: 'http://www.njmu.edu.cn/',
  logo: nanjinglogo,
  description: `
  ### Why Study Medicine at Nanjing Medical University, China
  
  #### Brief Introduction:
  Nanjing Medical University (NMU) is one of China's top medical institutions, established in 1934 and located in Nanjing, the capital of Jiangsu Province. NMU is recognized for its excellent medical education and advanced research. With a strong emphasis on clinical practice, NMU provides a comprehensive education in various health sciences and is internationally renowned for producing high-quality medical professionals.

  #### 1. History Briefs:
  - Founded in 1934 as Jiangsu Provincial Medical School
  - Renamed Nanjing Medical College in 1950
  - Rebranded Nanjing Medical University in 1993

  #### 2. Campus Overview:
  Nanjing Medical University is located in the heart of Nanjing, a city known for its cultural heritage and modern infrastructure. The university's campus spans over 100 hectares, offering state-of-the-art facilities to international students. The campus is designed with a student-centric approach to foster learning and collaboration among students and faculty.

  #### 3. Discipline Construction and Achievements:
  NMU has over 3,000 full-time faculty members, including experts in various medical fields. The university offers undergraduate, master's, and doctoral degrees in clinical medicine, biomedical sciences, public health, and medical technologies. NMU is recognized for its medical research in immunology, pharmacology, and epidemiology.

  The university has produced significant contributions to public health and medicine in China, including advances in cancer research, molecular biology, and traditional Chinese medicine.

  #### 4. Affiliated Hospitals:
  Nanjing Medical University is closely linked to a network of over 10 teaching hospitals, which are some of the best in the region. The university’s affiliated hospitals are critical to the development of medical education and research. One prominent example is the First Affiliated Hospital of Nanjing Medical University, which offers comprehensive medical services and specializes in advanced medical care.

  #### 5. International Student Education:
  NMU has been providing international students with a broad range of medical programs in English, including a Bachelor’s degree in Medicine (MBBS), postgraduate degrees, and PhD programs. It has a growing international student population, and the university offers scholarships for outstanding students.

  #### Communication and Cooperation:
  Nanjing Medical University maintains close academic and research relationships with over 50 universities globally, including prestigious institutions in the USA, UK, Canada, Australia, and Japan. The university frequently participates in international medical conferences, research collaborations, and exchange programs.
  `
},
{
  id: 4,
  name: "University of Tokyo",
  country: "Japan",
  image: "https://www.u-tokyo.ac.jp/content/400236311.jpg",
  address: "7 Chome-3-1 Hongo, Bunkyo City, Tokyo 113-8654, Japan",
  ranking: "28th (QS World University Rankings 2024)",
  tuition: "- USD 4,800–5,000 /year (undergraduate); varies for graduate programs",
  costOfLiving: "- USD 1200–1500 /month",
  monthlyStipend: `
  - ¥50,000–¥120,000/month (based on scholarship type such as MEXT, JASSO, etc.)`,
  programs: [
    "Engineering",
    "Medicine",
    "Law and Politics",
    "Science",
    "Economics",
    "Agricultural and Life Sciences",
    "Humanities and Sociology",
    "Education"
  ],
  website: "https://www.u-tokyo.ac.jp/en/",
  logo: "http://images.seeklogo.com/logo-png/50/1/the-university-of-tokyo-logo-png_seeklogo-508692.png",
  description: `
  ### Why Study at the University of Tokyo, Japan

  #### Brief Introduction:
  The University of Tokyo (UTokyo) is Japan's most prestigious and globally recognized institution for higher education and research. Established in 1877, UTokyo consistently ranks among the top universities worldwide. It offers a broad range of programs and fosters academic excellence, innovation, and international exchange.

  #### 1. History Briefs:
  - Founded in 1877 as the Imperial University of Tokyo
  - Renamed to the University of Tokyo in 1947
  - Produced numerous Nobel laureates and world leaders in science and policy

  #### 2. Campus Overview:
  UTokyo’s main campus is located in central Tokyo, blending historical architecture with modern research facilities. Students benefit from proximity to the political, technological, and cultural hub of Japan, with access to libraries, laboratories, and green spaces.

  #### 3. Discipline Construction and Achievements:
  The university excels in fields such as physics, engineering, medicine, economics, and humanities. It offers undergraduate and graduate programs, many of which are available in English for international students. The institution is home to some of Asia’s most advanced research centers.

  #### 4. Affiliated Hospitals:
  The University of Tokyo Hospital is a leading center for advanced medical care and research. It provides clinical education, cutting-edge treatments, and serves as a top-tier teaching hospital in Japan.

  #### 5. International Student Education:
  UTokyo offers extensive support for international students, including English-taught degrees, dormitories, and scholarships such as MEXT and JASSO. The university has a global student body and emphasizes cross-cultural academic exchange.

  #### Communication and Cooperation:
  UTokyo partners with over 400 universities globally and actively engages in joint research, student exchanges, and global conferences. These collaborations enhance learning and create opportunities for international careers.
  `
},
{
  id: 5,
  name: "Stanford University",
  country: "USA",
  image: "https://www.stanford.edu/wp-content/uploads/2023/03/purposeful-hero.png",
  address: "450 Serra Mall, Stanford, CA 94305, United States",
  ranking: "3",
  tuition: "- USD 56,000–60,000 per year",
  costOfLiving: "- USD 1500–2700 /month",
  monthlyStipend: `
  - USD 2,200–3,000/month for PhD students (varies by department)`,
  programs: [
    "Computer Science",
    "Engineering",
    "Business (Stanford Graduate School of Business)",
    "Biological Sciences",
    "Law",
    "Psychology",
    "Economics"
  ],
  website: "https://www.stanford.edu/",
  logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
  description: `
  ### Why Study at Stanford University, USA

  #### Brief Introduction:
  Founded in 1885, Stanford University is a top-ranked private research university located in the heart of Silicon Valley, California. Known for its entrepreneurial spirit and cutting-edge research, Stanford has played a major role in shaping modern technology and innovation.

  #### 1. Academic Reputation:
  Stanford consistently ranks among the top 5 universities worldwide. It is renowned for its rigorous academic programs, world-class faculty, and emphasis on interdisciplinary learning.

  #### 2. Location Advantage:
  Its location in Silicon Valley places students at the epicenter of global tech and innovation. Stanford has strong ties with companies like Google, Apple, Tesla, and more, offering unparalleled internship and career opportunities.

  #### 3. Research and Innovation:
  The university is home to dozens of research institutes and labs focused on AI, sustainability, medicine, and more. Undergraduate and graduate students alike engage in meaningful research from early on.

  #### 4. Financial Aid:
  Stanford offers generous need-based financial aid. Many undergraduate students pay little or no tuition, and PhD students often receive full funding plus stipends.

  #### 5. Global Community:
  With students from over 90 countries, Stanford fosters a diverse and inclusive academic environment. International students receive support from dedicated offices and advisors.

  #### 6. Campus Life:
  The 8,000-acre campus features cutting-edge facilities, modern housing, top-notch athletic amenities, and over 600 student organizations, ensuring a vibrant and enriching student life.

  #### 7. Career Success:
  Stanford graduates are highly sought after in academia, industry, and entrepreneurship. The university has one of the most powerful alumni networks in the world, especially in tech and business.

  `
},
{
  id: 6,
  name: "Columbia University",
  country: "USA",
  image: "https://visit.columbia.edu/sites/visit.columbia.edu/files/styles/cu_crop/public/content/Looking%20Toward%20Low%20Library%20from%20Butler_0.jpg?itok=Ty4P8iJK",
  address: "116th and Broadway, New York, NY 10027, United States",
  ranking: "12",
  tuition: "- USD 55,000–65,000 per year",
  costOfLiving: "- USD 1800–3000 /month",
  monthlyStipend: `
  - USD 2,500–3,200/month for funded graduate students (varies by program)`,
  programs: [
    "Political Science",
    "Data Science",
    "Finance",
    "Medicine (Vagelos College of Physicians and Surgeons)",
    "Law (Columbia Law School)",
    "Journalism",
    "Architecture"
  ],
  website: "https://www.columbia.edu/",
  logo: "https://miro.medium.com/v2/resize:fit:1024/0*3qIWoFnZgVUtsXB-.png",
  description: `
  ### Why Study at Columbia University, USA

  #### Brief Introduction:
  Columbia University, founded in 1754, is a prestigious Ivy League institution located in the heart of New York City. As one of the oldest and most respected universities in the USA, Columbia combines world-class academics with the unmatched opportunities of a global city.

  #### 1. Academic Excellence:
  Columbia is known for rigorous programs across disciplines, particularly in law, business, journalism, and the sciences. It is home to multiple Nobel Prize winners, influential researchers, and global leaders.

  #### 2. Prime Location:
  Being in Manhattan offers students direct access to major industries, cultural institutions, media hubs, and global organizations. Internship and networking opportunities are abundant.

  #### 3. Research and Resources:
  With 200+ research centers and institutes, Columbia fosters groundbreaking work in climate science, neuroscience, public policy, and technology. The university also hosts the Pulitzer Prizes.

  #### 4. Financial Support:
  Columbia provides need-based financial aid to international students and funding packages for many graduate programs, including stipends and assistantships.

  #### 5. International Community:
  Columbia has a large and diverse international student body and is deeply committed to global engagement through programs, partnerships, and study-abroad options.

  #### 6. Campus and Student Life:
  The Morningside Heights campus blends historic architecture with modern facilities. With over 500 student organizations, students enjoy a vibrant campus experience amidst the energy of New York City.

  #### 7. Alumni Network:
  Columbia’s alumni include U.S. Presidents, Supreme Court justices, Pulitzer Prize winners, CEOs, and global changemakers. The university offers strong career support and global alumni connections.

  `
},

{
  id: 7,
  name: "Kyoto University",
  country: "Japan",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkvhMymXDJhPoN97czxiyIcBOWX6airKcBA&s",
  address: "Yoshida Honmachi, Sakyo Ward, Kyoto, 606-8501, Japan",
  ranking: "38",
  tuition: "- JPY 535,800/year (approx. USD 3,500–4,000)",
  costOfLiving: "- USD 800–1200 /month",
  monthlyStipend: `
  - JPY 48,000–145,000/month for MEXT scholars
  - Other internal scholarships available`,
  programs: [
    "Engineering",
    "Life Sciences",
    "Global Environmental Studies",
    "Law",
    "Economics",
    "Pharmaceutical Sciences",
    "Informatics"
  ],
  website: "https://www.kyoto-u.ac.jp/en",
  logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Kyoto_University_emblem.svg",
  description: `
  ### Why Study at Kyoto University, Japan

  #### 1. Academic Prestige:
  Founded in 1897, Kyoto University is one of Japan's most prestigious institutions and a leader in innovation, particularly in the sciences. It has produced multiple Nobel Laureates.

  #### 2. Research Excellence:
  Kyoto U emphasizes a spirit of academic freedom and cutting-edge research. It has numerous research centers and international collaborations across Asia, Europe, and the Americas.

  #### 3. Global Environment:
  Offers many English-taught graduate programs and fosters a welcoming community for international students. 

  #### 4. Scholarships:
  Kyoto offers MEXT, JASSO, and university-specific scholarships, making it financially viable for international students.

  #### 5. Campus Life:
  Located in historic Kyoto, the campus blends tradition with modernity, offering students a cultural and academically rich experience.
  `
},

{
  id: 8,
  name: "Osaka University",
  country: "Japan",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Z2XHrjSzq6Au4fhtC5knvkqwNn_G_eu65w&s",
  address: "1-1 Yamadaoka, Suita, Osaka 565-0871, Japan",
  ranking: "80",
  tuition: "- JPY 535,800/year (approx. USD 3,500–4,000)",
  costOfLiving: "- USD 700–1100 /month",
  monthlyStipend: `
  - JPY 48,000–145,000/month for MEXT or other scholarships`,
  programs: [
    "Biomedical Sciences",
    "Engineering Science",
    "Computer Science",
    "Language and Culture",
    "International Public Policy",
    "Frontier Biosciences",
    "Law and Politics"
  ],
  website: "https://www.osaka-u.ac.jp/en",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Osaka_University_logo.svg/800px-Osaka_University_logo.svg.png",
  description: `
  ### Why Study at Osaka University, Japan

  #### 1. Academic Excellence:
  Established in 1931, Osaka University is a top-tier Japanese national university known for research, innovation, and interdisciplinary education.

  #### 2. English-taught Programs:
  Offers various graduate and undergraduate programs in English across multiple disciplines, making it accessible to global students.

  #### 3. Innovation & Research:
  The university is strong in science and engineering, and its medical school is among Japan's best. It’s also part of multiple global research initiatives.

  #### 4. Global Focus:
  Osaka University has partnerships with over 300 universities worldwide and offers robust support for international students.

  #### 5. Vibrant Location:
  Located in the heart of Japan’s second-largest metro area, students enjoy rich cultural, tech, and culinary experiences alongside their education.
  `
},
{
  id: 9,
  name: "University of California, San Diego (UCSD)",
  country: "USA",
  image: "https://cdn.britannica.com/27/66627-050-27B5867D/Royce-Hall-University-of-California-Los-Angeles.jpg",
  address: "9500 Gilman Dr, La Jolla, CA 92093, United States",
  ranking: "63",
  tuition: "- USD 32,000–45,000 per year (for international students)",
  costOfLiving: "- USD 900–2000 /month",
  monthlyStipend: `
  - USD 1,200–2,200/month (for graduate research or teaching assistants)
  - External fellowships and need-based aid available`,
  programs: [
    "Computer Science",
    "Biological Sciences",
    "Oceanography",
    "Engineering (Mechanical, Electrical, Aerospace)",
    "Cognitive Science",
    "Economics",
    "Public Health"
  ],
  website: "https://www.ucsd.edu/",
  logo: "https://1000logos.net/wp-content/uploads/2021/04/University-of-California-logo.png",
  description: `
  ### Why Study at UC San Diego, USA

  #### 1. Academic Strength:
  UCSD is part of the prestigious University of California system and is especially known for STEM programs, life sciences, and oceanography. It consistently ranks among the top 100 global universities.

  #### 2. Research Excellence:
  UC San Diego is home to world-renowned research centers, including Scripps Institution of Oceanography and the Qualcomm Institute. Students have opportunities to engage in hands-on research early.

  #### 3. International Environment:
  The university hosts over 8,000 international students and scholars and offers numerous global exchange and study abroad programs.

  #### 4. Financial Aid:
  While undergraduate international students pay higher tuition, graduate students often receive assistantships, scholarships, or fellowships to cover costs.

  #### 5. Location & Campus Life:
  Located on the Pacific coast in La Jolla, California, the campus provides a scenic and vibrant learning environment with a strong tech startup ecosystem and nearby research institutions.
  `
},
{
  id: 10,
  name: "University of Melbourne",
  country: "Australia",
  image: "https://www.unimelb.edu.au/__data/assets/image/0012/3798804/video.jpg",
  address: "Parkville VIC 3010, Melbourne, Australia",
  ranking: "14 (QS World University Rankings 2025)",
  tuition: "- USD 35,000–48,000 per year",
  costOfLiving: "- USD 1400–2200 /month",
  monthlyStipend: `
  - USD 2,200–3,000/month for graduate research students
  - Scholarships available for coursework programs`,
  programs: [
    "Medicine",
    "Law",
    "Engineering",
    "Data Science",
    "Commerce",
    "Arts & Humanities",
    "Public Policy"
  ],
  website: "https://www.unimelb.edu.au/",
  logo: "https://universitiesaustralia.edu.au/wp-content/uploads/2019/05/UoM_Logo_Vert_Housed_RGB-1.jpg",
  description: `
  ### Why Study at the University of Melbourne, Australia

  #### 1. World-Class Education:
  Ranked #1 in Australia and top 20 globally, it is renowned for its strong research output and rigorous academic environment.

  #### 2. Research & Innovation:
  The university hosts over 100 research centers and institutes and is known for its innovation in health, science, and policy.

  #### 3. Scholarships:
  Offers generous funding options including the Melbourne Graduate Scholarship and Research Training Program.

  #### 4. Prime Location:
  Situated in the heart of Melbourne, a global city ranked as one of the best for students.

  #### 5. Global Recognition:
  Degrees from the University of Melbourne are internationally recognized and respected by employers worldwide.
  `
},

{
  id: 11,
  name: "Monash University",
  country: "Australia",
  image: "https://www.qschina.cn/sites/default/files/profiles-slideshow/course-guide-5.jpg",
  address: "Wellington Rd, Clayton VIC 3800, Melbourne, Australia",
  ranking: "42 (QS World University Rankings 2025)",
  tuition: "- USD 34,000–47,000 per year",
  costOfLiving: "- USD 1300–2000 /month",
  monthlyStipend: `
  - USD 2,000–2,600/month for postgraduate research students
  - Monash International Leadership Scholarships available`,
  programs: [
    "Pharmacy & Pharmaceutical Sciences",
    "Engineering",
    "Business & Economics",
    "Nursing",
    "Law",
    "Psychology",
    "Environmental Science"
  ],
  website: "https://www.monash.edu/",
  logo: "https://ih1.redbubble.net/image.4388528449.5997/ur,pin_large_front,square,1000x1000.jpg",
  description: `
  ### Why Study at Monash University, Australia

  #### 1. Global Impact:
  Monash is a member of the Group of Eight, Australia’s leading research-intensive universities, and has campuses across four continents.

  #### 2. STEM Focus:
  Especially renowned for science, medicine, and engineering fields, offering real-world experience through industry partnerships.

  #### 3. Career Outcomes:
  High graduate employability with a strong alumni network worldwide.

  #### 4. Scholarships:
  Generous support through the Monash International Merit Scholarship and research grants.

  #### 5. Supportive Environment:
  Known for excellent student support services including counseling, career guidance, and mentoring programs.
  `
},
{
  id: 12,
  name: "University of Sydney",
  country: "Australia",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGxlkUtJDOXr96vUjSJD1O9O8i3Ci4-Y3YQ&s",
  address: "Camperdown NSW 2006, Sydney, Australia",
  ranking: "19 (QS World University Rankings 2025)",
  tuition: "- USD 36,000–50,000 per year",
  costOfLiving: "- USD 1500–2400 /month",
  monthlyStipend: `
  - USD 2,000–2,800/month for research students
  - Australia Awards and USyd Scholarships available`,
  programs: [
    "Medicine & Health Sciences",
    "Law",
    "Engineering & IT",
    "Business",
    "Architecture",
    "Music",
    "Education"
  ],
  website: "https://www.sydney.edu.au/",
  logo: "https://pbs.twimg.com/profile_images/974153497754005505/HU-9SgRh_400x400.jpg",
  description: `
  ### Why Study at the University of Sydney, Australia

  #### 1. Australia's First University:
  Founded in 1850, it combines heritage with cutting-edge learning and research.

  #### 2. Excellence Across Disciplines:
  Known for strong faculties in law, medicine, business, and humanities.

  #### 3. Research Support:
  Extensive research grants, labs, and collaborative opportunities with industry partners.

  #### 4. Vibrant Campus Life:
  Home to over 250 student clubs and societies, with a diverse and inclusive international student community.

  #### 5. Scholarships:
  The University of Sydney offers scholarships for high-achieving international students across all programs.
  `
},{
  id: 13,
  name: "University of Toronto",
  country: "Canada",
  image: "https://www.utoronto.ca/sites/default/files/styles/banner_951/public/2025-04/Lawson%20Announcement_Hero%20Banner-edit.jpg?h=b1a4fe10&itok=fgVyxM8G",
  address: "27 King's College Cir, Toronto, ON M5S 1A1, Canada",
  ranking: "21 (QS World University Rankings 2025)",
  tuition: "- CAD 45,000–62,000 per year",
  costOfLiving: "- CAD 1,300–2,200 /month",
  monthlyStipend: `
  - CAD 1,800–2,500/month for research students
  - Scholarships available for international undergraduates`,
  programs: [
    "Computer Science",
    "Life Sciences",
    "Engineering",
    "Medicine",
    "Law",
    "Business Administration",
    "Arts & Humanities"
  ],
  website: "https://www.utoronto.ca/",
  logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/640px-Utoronto_coa.svg.png",
  description: `
  ### Why Study at the University of Toronto, Canada

  #### 1. Academic Prestige:
  Ranked Canada's #1 university, it is globally renowned for research, innovation, and teaching excellence.

  #### 2. Innovation Hub:
  U of T has incubated over 500 startups and is a top research powerhouse in AI, medicine, and engineering.

  #### 3. Diverse Programs:
  Offers 700+ undergraduate and 200+ graduate programs.

  #### 4. Campus & Community:
  Located in downtown Toronto, students benefit from rich multicultural exposure and networking.

  #### 5. Scholarships:
  The Lester B. Pearson International Scholarship is one of many offered to international students.
  `
},
{
  id: 14,
  name: "McGill University",
  country: "Canada",
  image: "https://www.usnews.com/object/image/00000156-6b7c-d0b3-ad56-ff7dbd8b0000/160808-mcgilluniversity-submitted.jpg?update-time=1470682544421&size=responsiveFlow970",
  address: "845 Sherbrooke St W, Montreal, QC H3A 0G4, Canada",
  ranking: "30 (QS World University Rankings 2025)",
  tuition: "- CAD 22,000–52,000 per year",
  costOfLiving: "- CAD 1,000–1,800 /month",
  monthlyStipend: `
  - CAD 1,700–2,400/month for research students
  - Entrance and merit-based scholarships available`,
  programs: [
    "Medicine",
    "Law",
    "Neuroscience",
    "Political Science",
    "International Development",
    "Engineering",
    "Psychology"
  ],
  website: "https://www.mcgill.ca/",
  logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png",
  description: `
  ### Why Study at McGill University, Canada

  #### 1. Academic Excellence:
  One of the top research universities in North America, consistently ranked in the global top 50.

  #### 2. Multilingual City:
  Located in Montreal, McGill offers a unique bilingual experience (English/French) in a vibrant student-friendly city.

  #### 3. Nobel Heritage:
  12 Nobel laureates are affiliated with McGill.

  #### 4. Supportive Campus:
  International students benefit from strong mentorship and academic support programs.

  #### 5. Funding & Affordability:
  Lower tuition compared to US institutions with high-quality education and living standards.
  `
},
{
  id: 15,
  name: "University of British Columbia (UBC)",
  country: "Canada",
  image: "https://static.wixstatic.com/media/b69726_293737668081439c893727043912a253~mv2.jpg/v1/fill/w_1000,h_563,al_c,q_85,usm_0.66_1.00_0.01/b69726_293737668081439c893727043912a253~mv2.jpg",
  address: "2329 West Mall, Vancouver, BC V6T 1Z4, Canada",
  ranking: "34 (QS World University Rankings 2025)",
  tuition: "- CAD 39,000–55,000 per year",
  costOfLiving: "- CAD 1,400–2,200 /month",
  monthlyStipend: `
  - CAD 2,000–2,800/month for graduate research students
  - International Major Entrance Scholarship (IMES) and more`,
  programs: [
    "Forestry",
    "Computer Science",
    "International Relations",
    "Sustainable Energy",
    "Engineering",
    "Film & Media Studies",
    "Business (Sauder School of Business)"
  ],
  website: "https://www.ubc.ca/",
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRqDUf4YmX5K43iSB0gDaZfEtPZrA04Lt4xA&s",
  description: `
  ### Why Study at University of British Columbia, Canada

  #### 1. Natural Beauty + Excellence:
  UBC’s Vancouver campus offers ocean, forest, and mountain views with world-class academic resources.

  #### 2. Research Intensive:
  UBC is a global leader in sustainability, clean tech, climate science, and entrepreneurship.

  #### 3. Global Community:
  18,000+ international students from 150+ countries.

  #### 4. Experiential Learning:
  Strong co-op and internship programs with Canadian and global companies.

  #### 5. Scholarships:
  Offers a wide range of entrance and need-based scholarships for undergraduate and graduate students.
  `
}







    
  ];
  
  export default universitiesData;
  