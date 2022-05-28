<script lang="ts" setup>
import { ref, defineProps } from "vue";
import ChButton from "@/components/ui/button/button.vue";
let props = defineProps({
  cryptoWidgetId: {
    type: String || Number,
  },
  selectValue: {
    type: String,
  },
  purseModel: {
    type: String,
  },
});
let string1 =
  '1) Добавьте скрипт в head HTML документа: <script src="http://172.10.1.10:9876/static/dist/bundle.js">';
let string2 =
  '2)Добавьте виджет в необходимое место HTML-документа <div #id="your_widget-name"></div>';
let string3 = "3)Добавьте следующий скрипт после </body>";
let string4 = `let init = function () {
        myCompanyApi.widgetContainer('your_widget-name',${props.cryptoWidgetId}, false, ${props.purseModel}, ${props.selectValue});
        }.bind(this);
        if (typeof myCompanyApi !== 'undefined') {
        init();
        } else {
        (myCompanyApiInitCallbacks = window.myCompanyApiInitCallbacks || []).push(init);
        }`;

let isLoadingBtn = ref(false);
const emit = defineEmits(["editCryptoWidget"]);
function copyText() {
  navigator.clipboard.writeText(string1 + string2 + string3 + string4);
}
function editCryptoWidget() {
  emit("editCryptoWidget");
}
</script>
<template>
  <div class="wrapper">
    <h2 style="margin: 0 0 83px 0">Создать крипто виджет</h2>
    <div class="form_profile-subtitle">
      <p>Поздравляем, ваш виджет готов!</p>
      <p>
        Скопируйте HTML код ниже, добавьте к себе на сайт и начните получать пожертвования
        в криптовалюте.
      </p>
    </div>
    <div class="pseudo_autocomplete">
      <div>
        <p>1) Добавьте скрипт в head HTML документа:</p>
        <p>
          &lt;script
          src="http://172.10.1.10:9878/static/dist/bundle.js"&gt;&lt;/script&gt;
        </p>
      </div>
      <div>
        <p>2)Добавьте виджет в необходимое место HTML-документа</p>
        <p>&lt;div #id="your_widget-name"&gt;&lt;div&gt;</p>
      </div>
      <div>
        <p>{{ string3 }}</p>
        <p>
          {{ string4 }}
        </p>
      </div>
    </div>
    <div class="btn_container" style="justify-content: flex-start">
      <ChButton
        class="my-btn"
        @click="copyText()"
        :loading="isLoadingBtn"
        :disabled="isLoadingBtn"
        style="max-width: 195px"
      >
        Скопировать HTML
      </ChButton>
      <ChButton
        class="my-btn"
        @click="editCryptoWidget"
        :loading="isLoadingBtn"
        :disabled="isLoadingBtn"
        style="max-width: 195px"
      >
        Изменить виджет
      </ChButton>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.btn_container {
  display: flex;
  justify-content: space-between !important;
}
.my-btn {
  margin: 0;
}
.wrapper {
  max-width: 420px;
  margin-left: 0;
}
h2 {
  position: relative;
  margin: 12px 0 20px 0 !important;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #5f9dd8;
  text-align: left;
  width: fit-content;
}
.pseudo_autocomplete {
  width: 100%;
  max-width: 653px;
  //height: 443px;
  background: #ffffff;
  border: 2px solid #b0ceec;
  box-sizing: border-box;
  border-radius: 35px;
  padding: 24px 32px;
  margin: 35px 0;
  font-size: 13.23px;
  text-align: left;

  color: #000000;

  p {
    margin: 8px 0;

    &:first-child {
      font-weight: bold;
    }
  }
}

.form_profile-subtitle {
  font-weight: 600;
  font-size: 13.23px;
  text-align: left;
  /* or 136% */

  p {
    margin: 0;
  }

  color: #0f75bd;

  p:first-child {
  }

  p:last-child {
    font-weight: 500;
  }
}

#widget {
  margin-top: 6px;
}

.crypto {
  &_form {
  }
}

.widget_form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 1000px;
}

.profile_form_wrapper-lk {
  align-items: baseline;
  max-width: 1000px;
}

.form-group_profile {
  a {
    color: #0f75bd;
    border-bottom: 1px solid #479dee;
  }

  a:visited {
    color: #0f75bd;
  }
}
</style>
