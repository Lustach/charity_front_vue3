<template>
  <div class="about">
    <div class="container">
      <div class="about__wrapper">
        <h1>О платформе</h1>

        <h3>Наша миссия</h3>
        <p>
          Наш фонд создает инновационные решения на базе ИТ технологий для того, чтобы
          помогать благотворительным фондам адаптироваться под стремительные изменения,
          происходящие в мире.
        </p>
        <p>
          Мы привносим технологии туда, где в них нуждаются больше всего, соединяя десятки
          фондов по всей России с теми, кто готов и хочет помогать, делая процесс сбора
          пожертвований удобным, понятным и современным.
        </p>

        <div class="our__goals">
          <h3>Наши задачи</h3>
          <div class="images__container">
            <div class="image__container">
              <img src="images/icons/nfc.png" alt="" />
              <p>Внедрить офлайн технологии сбора безналичных пожертвований</p>
            </div>
            <div class="image__container">
              <img src="images/icons/platform-icon.svg" alt="" />
              <p>
                Создать удобную платформу для управления всеми инструментами фандрайзинга
              </p>
            </div>
            <div class="image__container">
              <img src="images/icons/stats-icon.svg" alt="" />
              <p>
                Повысить доверие жертвователей к фондам путем создания понятной платформы
              </p>
            </div>
          </div>
          <p>
            Создавая решения «воБлаго», мы стремимся сделать процесс пожертвования
            максимально быстрым и удобным – один клик, одно касание:
          </p>
          <ul class="our__goals_list">
            <li>Онлайн платформа для сбора пожертвований</li>
            <li>Терминалы для сбора пожертвований в кафе и магазинах</li>
            <li>Виджет для сбора пожертвований в криптовалюте</li>
            <li>Личный кабинет НКО с аналитикой и отчетностью</li>
            <li>Система пожертвований в чеках и с помощью QR-кодов</li>
          </ul>
          <p>
            Мы постоянно привлекаем новых партнеров и подключаем новые точки, увеличивая
            покрытие нашей сети, благодаря чему все больше жертвователей имеют быстрый,
            простой и надежный доступ к удобным инструментам благотворительности.
          </p>
        </div>

        <h3>Уставные документы</h3>
        <div class="documents__block">
          <ul class="documents__block_list">
            <li>
              <a
                href="http://localhost:8000/static/documents/Устав благотворительного фонда.pdf"
                target="_blank"
                ><span>Устав благотворительного фонда</span>
                <span>(pdf, 14.7 MB)</span></a
              >
            </li>
            <li>
              <a
                href="http://localhost:8000/static/documents/Свидетельство_о_постановке_на_учет_в_налоговой.pdf"
                target="_blank"
                ><span>Свидетельство о постановке на учет в налоговом органе (ИНН)</span>
                <span>(pdf, 0.5 MB)</span></a
              >
            </li>
            <li>
              <a
                href="http://localhost:8000/static/documents/Протокол 23.11.pdf"
                target="_blank"
                ><span>Протокол общего собрания</span> <span>(pdf, 1.44 MB)</span></a
              >
            </li>
            <li>
              <a
                href="http://localhost:8000/static/documents/Лист записи ЕГРЮЛ.pdf"
                target="_blank"
                ><span>Лист записи ЕГРЮЛ</span> <span>(pdf, 2.62 MB)</span></a
              >
            </li>
            <li>
              <a
                href="http://localhost:8000/static/documents/Свидетельство_о_государственной_регистрации_НКО.pdf"
                target="_blank"
                ><span>Свидетельство о государственной регистрации НКО (Минюст)</span>
                <span>(pdf, 3.31 MB)</span></a
              >
            </li>
          </ul>
          <ChButton style="margin: 20px 0 20px 0;width: fit-content;padding: 0 40px;">Скачать архивом</ChButton>
        </div>
      </div>
    </div>
    <div id="widget"></div>

    <!--    <DialogDocumentPreview></DialogDocumentPreview>-->
  </div>
</template>

<script>
import ChButton from "@/components/ui/button/button.vue";
export default {
  name: "home",
  components: {
    ChButton,
    // DialogDocumentPreview:()=>import('@/components/modals/DialogDocumentPreview')
  },
  created() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped lang="scss">

</style>
