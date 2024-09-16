import {
  Interface
} from './interface.interface';

export const menu: Interface = {
  toolbar: true,
  color: 'primary',
  title: 'MY COIN COLLECTOR',
  menu: {
    iconsColor: 'accent',
    items: [
      {
        name: "Collezione",
        icon: "home",
        link: "/collezione",
        menu: {
          indentation: 4,
          iconsColor: 'primary',
          iconsScale: 0.9,
          divider: true,
          items: [{
              name: "Stati preunitari",
              icon: "view_headline",
              link: "/collezione/REP_VEN",
              menu: {
                indentation: 8,
                iconsScale: 0.8,
                divider: true,
                items: [{
                  name: 'Venezia',
                  link: '/collezione/REP_VEN'
                }]
              }
            },
            {
              name: "Savoia",
              icon: "view_headline",
              link: "/collezione/VE1_RSA",
              menu: {
                indentation: 8,
                iconsScale: 0.8,
                divider: true,
                items: [{
                    name: 'Vittorio Emanuele I',
                    link: '/collezione/VE1_RSA'
                  },
                  {
                    name: 'Carlo Felice',
                    link: '/collezione/CFE_RSA'
                  },
                  {
                    name: 'Carlo Alberto',
                    link: '/collezione/CAL_RSA'
                  },
                  {
                    name: 'Vittorio Emanuele II',
                    icon: 'view_headline',
                    link: '/collezione/VE2_RSA',
                    menu: {
                      indentation: 12,
                      iconsScale: 0.7,
                      divider: true,
                      items: [{
                          name: 'Re di Sardegna',
                          link: '/collezione/VE2_RSA'
                        },
                        {
                          name: 'Re eletto',
                          link: '/collezione/VE2_REL'
                        },
                        {
                          name: 'Re d\'italia',
                          link: '/collezione/VE2_RIT'
                        }
                      ]
                    }
                  },
                  {
                    name: 'Umberto I',
                    link: '/collezione/UM1_RIT'
                  },
                  {
                    name: 'Vittorio Emanuele III',
                    link: '/collezione/VE3_RIT'
                  }
                ]
              }
            },
            {
              name: "Colonie",
              icon: "view_headline",
              link: "/collezione/UM1_COL",
              menu: {
                indentation: 8,
                iconsScale: 0.8,
                divider: true,
                items: [{
                    name: 'Umberto I',
                    link: '/collezione/UM1_COL'
                  },
                  {
                    name: 'Vittorio Emanuele III',
                    link: '/collezione/VE3_COL'
                  },
                  {
                    name: 'AFIS',
                    link: '/collezione/AFS_COL'
                  }
                ]
              }
            },
            {
              name: "Stati Italiani",
              icon: 'view_headline',
              link: "/collezione/ITA_LIR",
              menu: {
                indentation: 8,
                iconsScale: 0.8,
                divider: true,
                items: [{
                    name: 'Repubblica italiana',
                    link: '/collezione/ITA_LIR'
                  },
                  {
                    name: 'Repubblica di San Marino',
                    link: '/collezione/SMN_LIR'
                  },
                  {
                    name: 'Vaticano',
                    link: '/collezione/VAT_LIR'
                  }
                ]
              }
            }
          ]
        }
      },
      {
        name: "Parametri",
        icon: "settings",
        link: "/parametri/conservazioni",
        menu: {
          indentation: 8,
          iconsScale: 0.9,
          divider: true,
          items: [{
              name: "Conservazione",
              icon: "edit",
              link: "/parametri/conservazioni"
            },
            {
              name: "Contorno",
              icon: "edit",
              link: "/parametri/contorni"
            },
            {
              name: "Denominazione",
              icon: "edit",
              link: "/parametri/denominazioni"
            },
            {
              name: "Materiale",
              icon: "edit",
              link: "/parametri/materiali"
            },
            {
              name: "Rarità",
              icon: "edit",
              link: "/parametri/rarita"
            },
            {
              name: "Segno zecca",
              icon: "edit",
              link: "/parametri/segniZecche"
            },
            {
              name: "Sovranità",
              icon: "edit",
              link: "/parametri/sovranita"
            },
            {
              name: "Sovrano",
              icon: "edit",
              link: "/parametri/sovrani"
            },
            {
              name: "Stato",
              icon: "edit",
              link: "/parametri/stati"
            },
            {
              name: "Valore",
              icon: "edit",
              link: "/parametri/nominali"
            },
            {
              name: "Zecca",
              icon: "edit",
              link: "/parametri/zecche"
            }
          ]
        }
      },
      {
        name: 'Unità',
        icon: 'straighten',
        link: '/units/pesi',
        menu: {
          indentation: 8,
          iconsScale: 0.9,
          divider: true,
          items: [{
              name: "Pesi",
              icon: "brush",
              link: "/units/pesi"
            },
            {
              name: "Lunghezze",
              icon: "brush",
              link: "/units/lunghezze"
            }
          ]
        }
      },
      {
        name: 'Risorse',
        icon: 'save',
        link: '/resources/images',
        menu: {
          indentation: 8,
          iconsScale: 0.9,
          divider: true,
          items: [{
              name: 'Immagini',
              icon: 'photo',
              link: '/resources/images'
            },
            {
              name: 'Fatture',
              icon: 'insert_drive_file',
              link: '/resources/invoices'
            },
          ]
        }
      },
      {
        name: 'Gestione',
        icon: 'build',
        link: 'gestione/add-scheda',
        menu: {
          indentation: 8,
          iconsScale: 0.9,
          divider: true,
          items: [{
              name: 'Aggiungi scheda',
              icon: 'add',
              link: 'gestione/add-scheda'
            },
            {
              name: 'Backup',
              icon: 'backup',
              link: 'gestione/backup'
            },
          ]
        }
      }
    ]
  }

}
