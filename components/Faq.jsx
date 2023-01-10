import { Accordion } from "@mantine/core";
import { Question } from "phosphor-react";
export default function Faq() {
  return (
    <Accordion
      className="w-full  "
      variant="separated"
      chevronPosition="left"
      defaultValue="customization"
    >
      <Accordion.Item value="customization">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            پیش از رزرو هتل، چگونه درباره هتل و فرآیند رزرو آن اطلاعات کسب کنم؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            فرایند انتخاب و رزرو اینترنتی هتل در علی بابا بسیار ساده است. به
            سادگی و با چند کلیک می توانید با انتخاب مقصد و تاریخ سفر خود، هتل مد
            نظر خود را با قیمت مناسب رزرو کنید. با این حال در صورت نیاز، مرکز
            پشتیبانی علی بابا به صورت 24 ساعته پاسخگوی شماست
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization1">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            هزینه هتل خارجی را چه طور بپردازیم؟ آیا استفاده از کارت‌های شتاب
            امکان‌پذیر است؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            زمانی که برای رزرو هتل خارجی به وب‌سایت یا اپلیکیشن علی بابا مراجعه
            می‌کنید، خیالتان از بابت نحوه پرداخت راحت باشد. شما می‌توانید هزینه
            رزرو هتل را با همین کارت‌های شتاب خودتان بپردازید. به هیچ وجه نیازی
            به استفاده از کارت‌های اعتباری خارجی نیست
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization2">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            آیا پس از اینکه هتل را رزرو کردیم، می‌توانیم رزرومان را کنسل کنیم و
            پولمان را پس بگیریم؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            طبیعی است که گاهی اوقات سفرمان به هر دلیلی کنسل شود. هر کدام از
            هتل‌ها قوانین خودشان را برای کنسلی دارند. بعضی از هتل‌ها استرداد پول
            را می‌پذیرند؛ البته این استرداد در بیشتر موارد با کسر هزینه جریمه
            است. میزان جریمه هم باز به قوانین هتل و زمانی که کنسلی را اعلام
            می‌کنید، بستگی دارد. (هر چه دیرتر کنسلی را اعلام کنید، احتمال افزایش
            جریمه بیشتر است). اما هتل‌هایی هم وجود دارند که کنسلی و استرداد وجه
            را نمی‌پذیرند. زمانی که در علی بابا در حال رزرو آنلاین هتل هستید،
            می‌توانید به راحتی قوانین کنسلی را بخوانید. در هنگام رزرو در مقابل
            هر یک از اتاق‌های هتل واژه‌های «قوانین کنسلی» یا «غیرقابل استرداد»
            را مشاهده می‌کنید. غیرقابل استرداد همان طور که از نامش پیداست، وجهی
            به شما پس نمی‌دهد. اما اگر واژه قوانین کنسلی را هنگام جستجوی یک هتل
            دیدید، روی آن کلیک کنید و این قوانین را بخوانید
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization3">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            چه ساعتی می‌توانیم اتاق‌مان را تحویل بگیریم و چه ساعتی باید اتاق را
            پس بدهیم؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex justify-end text-xl text-right px-12">
            معمولا ورود مسافر به اتاق (چک‌این) در ساعت 14 و خروج مسافر (چک‌اوت)
            ساعت 12 ظهر است
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization4">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            نیم‌شارژ ورود و خروج چیست؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            ساعت ورود به هتل ساعت 14 و خروج 12 ظهر است؛ مسافرانی که ورود
            زودهنگام (حدود ساعت 8 صبح) یا خروج دیرهنگام (حدود ساعت 18 عصر) را
            دارند، از این گزینه استفاده می‌کنند؛ قیمت نیم‌شارژ معمولا نصف رزرو
            یک شب است. با این حال این هزینه توسط هتل تعیین می‌شود و از هتلی به
            هتل دیگر می‌تواند متفاوت باشد
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization5">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            کودکان تا چه سنی رایگان پذیرش می‌شوند و تخت آنها چگونه است؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex justify-end text-xl text-right px-12">
            شرایط سنی کودک برای پذیرش در هتل در قسمت «قوانین» اطلاع‌رسانی شده
            است
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization6">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            تفاوت اتاق‌ها با هم مانند دبل یا توئین بودن یا جونیور یا امپریال یا
            حتی سوئیت چیست؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            اتاق دبل دو تخت چسبیده‌به‌هم دارد و مناسب زوج‌ها است. اتاق‌های تویین
            دو تخت سینگل یا جدا از هم دارند. اتاق‌هایی مثل جونیور یا امپریال از
            نظر متراژ، دیزاین و طبقات نسبت به اتاق‌های استاندارد اتاق‌های
            باکیفیت‌تری هستند. البته سرویس و خدمات هتل برای همه اتاق‌ها یکسان
            است
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization7">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            واچر چیست؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            سید پرداخت و تاییدیه رزرو اقامتگاه را «واچر» می‌گویند. واچر پس از
            انجام پرداخت توسط شما از طرف سیستم رزرواسیون علی بابا صادر می‌شود و
            در اختیار شما قرار می‌گیرد
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization8">
        <Accordion.Control
          icon={<Question size={40} color="#4405a8" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            مبلغ درج شده در وب‌سایت مبلغ نهایی است؟ آیا امکان دارد بعدا تغییر
            کند؟
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex justify-end text-xl text-right px-12">
            مبلغ اعلام‌شده نهایی است، مگر در زمان‌های خاص مانند عید نوروز؛ در
            این شرایط حتما در هنگام رزرو اعلام می‌شود که نرخ فعلی علی‌الحساب است
          </span>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
