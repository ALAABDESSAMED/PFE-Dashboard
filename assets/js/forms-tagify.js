/**
 * Tagify
 */

'use strict';

(function () {

  // Status Color 
  // --------------------------------------------------------
  const StatusColorsTagsEl = document.querySelector('#StatusColorsTags');
  
  const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "label-primary",
    "label-secondary",
    "label-success",
    "label-danger",
    "label-warning",
    "label-info",
    "label-dark"
  ];
  
  // Create a function to generate tags with Bootstrap classes
  function generateTagWithBootstrapColor(tagData) {
    return `<span class="badge bg-${tagData.value}">
              ${tagData.value}
              <x role="button" class="tagify__tag__removeBtn">
               
              </x>
            </span>`;
  }
  
  // Inline
  let StatusColorsTags = new Tagify(StatusColorsTagsEl, {
    whitelist: colors,
    maxTags: 1,
    dropdown: {
      maxItems: 20,
      classname: 'tags-inline',
      enabled: 0,
      closeOnSelect: false
    },
    templates: {
      tag: function(tagData) {
        return generateTagWithBootstrapColor(tagData);
      }
    }
  });
  // List
  


  // Basic
  //------------------------------------------------------
  const tagifyBasicEl = document.querySelector('#TagifyBasic');
  const TagifyBasic = new Tagify(tagifyBasicEl);

  // Read only
  //------------------------------------------------------
  const tagifyReadonlyEl = document.querySelector('#TagifyReadonly');
  const TagifyReadonly = new Tagify(tagifyReadonlyEl);

  // Custom list & inline suggestion
  //------------------------------------------------------
  const TagifyCustomInlineSuggestionEl = document.querySelector('#TagifyCustomInlineSuggestion');
  const TagifyCustomListSuggestionEl = document.querySelector('#TagifyCustomListSuggestion');

  const whitelist = [
    'anti age',
    'beauté des mains',
    'beauté des pieds',
    'bon',
    'bourg la reine',
    'bracelet',
    'cadeau',
    'californien',
    'charme d\'orient',
    'corps',
    'cérémonie',
    'duo',
    'Eau',
    'enveloppement',
    'femme',
    'femme enceinte',
    'Gommage',
    'hammam',
    'Huile',
    'jeunesse',
    'lifting',
    'maman',
    'manucure',
    'mary cohr',
    'Massage',
    'minceur',
    'miss ferling',
    'paris',
    'pierre',
    'piscine',
    'sauna',
    'sensation spa',
    'skinhaptics',
    'soin',
    'soin visage',
    'Spa',
    'spa des sens',
    'suedois',
    'sur mesure',
    'sérum',
    'thailandais',
    'themae',
    'Tonique',
    'Visage',
    'éclaircissant'
];

  // Inline
  let TagifyCustomInlineSuggestion = new Tagify(TagifyCustomInlineSuggestionEl, {
    whitelist: whitelist,
    maxTags: 10,
    dropdown: {
      maxItems: 20,
      classname: 'tags-inline',
      enabled: 0,
      closeOnSelect: false
    }
  });
  // List
  let TagifyCustomListSuggestion = new Tagify(TagifyCustomListSuggestionEl, {
    whitelist: whitelist,
    maxTags: 10,
    dropdown: {
      maxItems: 20,
      classname: '',
      enabled: 0,
      closeOnSelect: false
    }
  });

  // Suggested Products
  //------------------------------------------------------
  const TagifyUserListEl = document.querySelector('#suggestedProducts');

  const productList = [
    {
      value: 1,
      name: 'Soin Visage 1',
      avatar: 'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29pbiUyMGR1JTIwdmlzYWdlfGVufDB8fDB8fHww',
      email: 'Institut 1'
    },
    {
      value: 2,
      name: 'Soin Corps 1',
      avatar: 'https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29pbiUyMGR1JTIwY29ycHxlbnwwfHwwfHx8MA%3D%3D',
      email: 'Institut 1'
    },
    {
      value: 3,
      name: 'Spa',
      avatar: 'https://plus.unsplash.com/premium_photo-1679430887921-31e1047e5b55?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhfGVufDB8fDB8fHww',
      email: 'Institut 3'
    }
  ];

  function tagTemplate(tagData) {
    return `
    <tag title="${tagData.title || tagData.email}"
      contenteditable='false'
      spellcheck='false'
      tabIndex="-1"
      class="${this.settings.classNames.tag} ${tagData.class ? tagData.class : ''}"
      ${this.getAttributes(tagData)}
    >
      <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
      <div>
        <div class='tagify__tag__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>
        <span class='tagify__tag-text'>${tagData.name}</span>
      </div>
    </tag>
  `;
  }

  function suggestionItemTemplate(tagData) {
    return `
    <div ${this.getAttributes(tagData)}
      class='tagify__dropdown__item align-items-center ${tagData.class ? tagData.class : ''}'
      tabindex="0"
      role="option"
    >
      ${
        tagData.avatar
          ? `<div class='tagify__dropdown__item__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>`
          : ''
      }
      <div class="fw-medium">${tagData.name}</div>
      <span>${tagData.email}</span>
    </div>
  `;
  }
  function dropdownHeaderTemplate(suggestions) {
    return `
        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <strong>${this.value.length ? `Ajouter le reste` : 'Ajouter Touts'}</strong>
            <span>${suggestions.length} produits</span>
        </div>
    `;
  }

  // initialize Tagify on the above input node reference
  let TagifyUserList = new Tagify(TagifyUserListEl, {
    tagTextProp: 'name', // very important since a custom template is used with this property as text. allows typing a "value" or a "name" to match input with whitelist
    enforceWhitelist: true,
    skipInvalid: true, // do not remporarily add invalid tags
    dropdown: {
      closeOnSelect: false,
      enabled: 0,
      classname: 'users-list',
      searchKeys: ['name', 'email'] // very important to set by which keys to search for suggesttions when typing
    },
    templates: {
      tag: tagTemplate,
      dropdownItem: suggestionItemTemplate,
      dropdownHeader: dropdownHeaderTemplate
    },
    whitelist: productList
  });

  // attach events listeners
  TagifyUserList.on('dropdown:select', onSelectSuggestion) // allows selecting all the suggested (whitelist) items
    .on('edit:start', onEditStart); // show custom text in the tag while in edit-mode

  function onSelectSuggestion(e) {
    // custom class from "dropdownHeaderTemplate"
    if (e.detail.elm.classList.contains(`${TagifyUserList.settings.classNames.dropdownItem}__addAll`))
      TagifyUserList.dropdown.selectAll();
  }

  function onEditStart({ detail: { tag, data } }) {
    TagifyUserList.setTagTextNode(tag, `${data.name} <${data.email}>`);
  }

  // Email List suggestion
  //------------------------------------------------------
  // generate random whitelist items (for the demo)
  let randomStringsArr = Array.apply(null, Array(100)).map(function () {
    return (
      Array.apply(null, Array(~~(Math.random() * 10 + 3)))
        .map(function () {
          return String.fromCharCode(Math.random() * (123 - 97) + 97);
        })
        .join('') + '@gmail.com'
    );
  });

  const TagifyEmailListEl = document.querySelector('#TagifyEmailList'),
    TagifyEmailList = new Tagify(TagifyEmailListEl, {
      // email address validation (https://stackoverflow.com/a/46181/104380)
      pattern:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      whitelist: randomStringsArr,
      callbacks: {
        invalid: onInvalidTag
      },
      dropdown: {
        position: 'text',
        enabled: 1 // show suggestions dropdown after 1 typed character
      }
    }),
    button = TagifyEmailListEl.nextElementSibling; // "add new tag" action-button

  button.addEventListener('click', onAddButtonClick);

  function onAddButtonClick() {
    TagifyEmailList.addEmptyTag();
  }

  function onInvalidTag(e) {
    console.log('invalid', e.detail);
  }
})();


