<AppBar position="static" color="default">
<Tabs
  value={value}
  onChange={handleChange}
  aria-label="simple tabs example"
  TabIndicatorProps={{
    style: { backgroundColor: "#f1a444", height: "1px" },
  }}
>
  <Tab label="داستان" {...a11yProps(0)} />
  <Tab label="قوانین" {...a11yProps(1)} />
  <Tab label="آدرس" {...a11yProps(2)} />
  <Tab label="سوالات متداول" {...a11yProps(3)} />
</Tabs>
</AppBar>
<TabPanel value={value} index={0} className={style.tabPanel}>
<p>
  محترم و اسماعیل مطابق یک سنت خانوادگی از کودکی برای یکدیگر در
  نظر گرفته می‌شوند و در سال ۱۳۴۱ با یک دیگر ازدواج می‌کنند
</p>
<p>
  پس از یک سال شایعه زلزله ای بر سر زبان ها می‌افتد و شهر تخلیه
  می‌شود .
  <br />
  روزی محترم در راه بازگشت به خانه میان خیال و واقعیت داخل کوچه
  شبحی را میبیند و دقایقی بعد در چند متری خود در حیاط با شبح
  روبرو میشود ک با صدایی وحشتناک ب سوی او میآید انچنان هراس
  وجودش را فرا میگیرد ک در ابتدا یارای حرکت ندارد و بعد …
</p>
</TabPanel>
<TabPanel value={value} index={1} className={style.tabPanel}>
<p>سناریو بازی رو تمام افراد تیم مطالعه میکنند.</p>
<p>تمام افراد ماسک همراه داشته باشند.</p>
<p>
  حداقل تعداد افراد 4 نفر است.-به هیچ عنوان اکتور بازی را تاچ
  نکنید، وارد هر اتاقی شدید درب را پشت سرتان ببندید و به گفته
  های راهنمای بازی گوش کنید.
</p>
<p>
  از ورود افراد با سطح هوشیاری پایین به هر دلیل: استفاده از
  شروبات الکلی، مخدر و ... معذور میباشیم و هر قسمت از بازی متوجه
  شویم بازی کنسل و موظف هستید مبلغ را به طور کامل پرداخت کنید‌.
</p>
</TabPanel>
<TabPanel value={value} index={2} className={style.tabPanel}>
Item Three
</TabPanel>
<TabPanel value={value} index={3} className={style.tabPanel}>
<div className={style.qAndAWrap}>
  <Accordion classes={{ root: classes.Accordion }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      classes={{ root: classes.AccordionSummary }}
    >
      آیا پارکینگ در محل موجود است؟
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classes.AccordionDetails }}
    >
      خیر، وجود ندارد.
    </AccordionDetails>
  </Accordion>
  <Accordion classes={{ root: classes.Accordion }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      classes={{ root: classes.AccordionSummary }}
    >
      این بازی برای چه گروه سنی مناسبه؟
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classes.AccordionDetails }}
    >
      از 16 الی 90 سال!
    </AccordionDetails>
  </Accordion>
  <Accordion classes={{ root: classes.Accordion }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      classes={{ root: classes.AccordionSummary }}
    >
      آیان مکان بازی و خودِ فضای بازی برای معلولین مناسبه؟
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classes.AccordionDetails }}
    >
      متاسفانه خیر
    </AccordionDetails>
  </Accordion>
  <Accordion classes={{ root: classes.Accordion }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      classes={{ root: classes.AccordionSummary }}
    >
      من بازی‌های با درجه سختی بالاتر رو بازی کردم، به نظرتون
      این بازی بهم لذتی میده؟
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classes.AccordionDetails }}
    >
      قطعا بله! معماهای بازیها متفاوته و البته سناریو و فضاسازی
      هر بازی منحصر به فرده. درجه سختی ملاک مناسبی برای تجربه
      نکردنِ یک بازی نیست!
    </AccordionDetails>
  </Accordion>
  <Accordion classes={{ root: classes.Accordion }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      classes={{ root: classes.AccordionSummary }}
    >
      کافه‌ای در محل بازی وجود داره؟
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classes.AccordionDetails }}
    >
      خیر، اما در منطقه کافه و رستوران‌های متعددی هستن که
      میتونید از خدماتشون استفاده کنید.
    </AccordionDetails>
  </Accordion>
  <Accordion classes={{ root: classes.Accordion }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      classes={{ root: classes.AccordionSummary }}
    >
      با توجه به دلهره‌آور بودنِ این اتاق، آیا این بازی رو به
      افراد باردار یا بیماران قلبی توصیه می‌کنید؟
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classes.AccordionDetails }}
    >
      خیر، در صورت ابتلا به هر گونه بیماری که ترس یا شوک
      می‌تواند روی آن تاثیرگذار باشد و همچنین خانم‌های باردار،
      گیم‌مستر (بازی‌گردان) بازی را مطلع کنید
    </AccordionDetails>
  </Accordion>
</div>
</TabPanel>

