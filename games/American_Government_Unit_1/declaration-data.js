'use strict';

window.PAGE_VOCAB = [
  ['Dissolve','To formally end a relationship, agreement, or political connection.',['dissolved','dissolving']],
  ['Political bands','Connections that join people or governments together.',['political band']],
  ['Assume','To take on a role, position, power, or responsibility.',['assumed','assuming']],
  ['Equal station','An equal political position or standing among nations.',[]],
  ['Entitle','To give someone a right or valid claim to something.',['entitles','entitled']],
  ['Impel','To strongly push or drive someone toward an action.',['impels','impelled']],
  ['Self-evident','Clearly true without needing additional proof.',['self evident'],{es:'evidente por sí mismo',ar:'بديهي',ps:'په خپله څرګند',so:'iskiis u cad',sw:'dhahiri bila uthibitisho'}],
  ['Endow','To provide or equip someone with a quality or right.',['endowed','endows']],
  ['Unalienable Rights','Rights that cannot rightfully be taken away or surrendered.',['unalienable right'],{es:'derechos inalienables',ar:'حقوق غير قابلة للتصرف',ps:'نه سلبېدونکي حقونه',so:'xuquuq aan laga qaadi karin',sw:'haki zisizoweza kuondolewa'}],
  ['Institute','To establish or begin a system or organization.',['instituted','instituting']],
  ['Derive','To receive or obtain something from a source.',['deriving','derived','derives']],
  ['Consent of the Governed','The principle that legitimate government depends on the people’s permission.',['consent of the governed'],{es:'consentimiento de los gobernados',ar:'موافقة المحكومين',ps:'د خلکو رضایت',so:'oggolaanshaha dadka la xukumo',sw:'ridhaa ya watawaliwa'}],
  ['Alter','To change something.',['altered','altering']],
  ['Abolish','To formally end a system, practice, or institution.',['abolished','abolishing']],
  ['Prudence','Careful judgment about what is wise and reasonable.',['prudent']],
  ['Transient','Temporary or lasting only a short time.',['transitory']],
  ['Disposed','Inclined or willing to act in a particular way.',['dispose']],
  ['Usurpation','The wrongful seizure or use of power.',['usurpations','usurp']],
  ['Evince','To show or demonstrate clearly.',['evinces','evinced']],
  ['Despotism','Government in which a ruler uses absolute power in a cruel or oppressive way.',['despotic'],{es:'despotismo',ar:'استبداد',ps:'استبداد',so:'xukun kelitalis ah',sw:'utawala wa kidhalimu'}],
  ['Tyranny','Cruel and oppressive use of government power.',['tyrant','tyrants','tyrannical'],{es:'tiranía',ar:'طغيان',ps:'ظلم او استبداد',so:'dulmi talisnimo',sw:'udhalimu'}],
  ['Assent','Official agreement or approval.',['assented']],
  ['Relinquish','To give up a right, claim, or possession.',['relinquished','relinquishing']],
  ['Legislature','A representative body with the authority to make laws.',['legislatures','legislative']],
  ['Depository','A place where records or other valuable materials are stored.',['depositories']],
  ['Compliance','The act of obeying a request, rule, or demand.',['comply','complied']],
  ['Annihilation','Complete destruction.',['annihilate','annihilated']],
  ['Naturalization','The legal process through which a noncitizen becomes a citizen.',['naturalize','naturalized']],
  ['Judiciary','The courts and judges within a government.',['judicial']],
  ['Tenure','The conditions or length of time someone holds an office or position.',['tenures']],
  ['Standing army','A permanent professional military force maintained during both war and peace.',['standing armies']],
  ['Quartering','Housing soldiers in civilian buildings or homes.',['quartered','quarter']],
  ['Arbitrary','Based on unchecked choice rather than consistent law or reason.',['arbitrarily']],
  ['Abdicate','To give up or abandon a duty, responsibility, or position of power.',['abdicated','abdication']],
  ['Mercenary','A professional soldier hired to fight for a foreign power.',['mercenaries']],
  ['Perfidy','Deliberate betrayal or breaking of trust.',['perfidious']],
  ['Insurrection','An organized uprising against a government or authority.',['insurrections']],
  ['Petition','A formal request to a government or other authority.',['petitioned','petitions']],
  ['Redress','A remedy or correction for a wrong or injury.',['redressed']],
  ['Magnanimity','Generosity and fairness, especially toward an opponent.',['magnanimous']],
  ['Kindred','People related by family, origin, or close connection.',['kin']],
  ['Acquiesce','To accept something reluctantly but without further resistance.',['acquiesced','acquiescence']],
  ['Rectitude','Morally correct behavior or intentions.',['uprightness']],
  ['Absolve','To release someone from a duty, obligation, or blame.',['absolved','absolves']],
  ['Allegiance','Loyalty or commitment to a ruler, government, or country.',['allegiances']],
  ['Levy','To impose or collect something, or to raise troops for war.',['levied','levying']],
  ['Providence','Protective guidance or care believed to come from God.',['divine providence']],
  ['Pledge','A serious promise or commitment.',['pledged','pledges']],
  ['Grievance','A complaint about a wrong or abuse, offered as a reason for action.',['grievances'],{es:'agravio o queja',ar:'مظلمة أو شكوى',ps:'شکایت یا ګیله',so:'cabasho ku saabsan dulmi',sw:'lalamiko kuhusu kosa'}],
  ['Independence','Political freedom from another government’s control.',['independent'],{es:'independencia',ar:'الاستقلال',ps:'خپلواکي',so:'madax-bannaani',sw:'uhuru'}]
].map(([term,definition,forms=[],translations={}]) => ({term,definition,forms,translations,tier:2}));

window.DECLARATION_HELP = {
  assignment: {
    es: 'Lee cada sección del texto original. Después, usa el resumen en lenguaje sencillo y responde las preguntas al final.',
    ar: 'اقرأ كل قسم من النص الأصلي. ثم استخدم الملخص بلغة واضحة وأجب عن الأسئلة في النهاية.',
    ps: 'د اصلي متن هره برخه ولولئ. بیا د ساده ژبې لنډیز وکاروئ او په پای کې پوښتنو ته ځواب ووایئ.',
    so: 'Akhri qayb kasta oo qoraalka asalka ah. Kadib adeegso soo koobidda fudud oo ka jawaab su’aalaha dhammaadka.',
    sw: 'Soma kila sehemu ya maandishi ya awali. Kisha tumia muhtasari wa lugha rahisi na ujibu maswali ya mwisho.'
  },
  introduction: {
    es: 'Los autores dicen que, cuando un pueblo decide separarse de otro gobierno, debe explicar públicamente sus razones.',
    ar: 'يقول الكتّاب إنه عندما يقرر شعب الانفصال عن حكومة أخرى، فعليه أن يشرح أسبابه علنًا.',
    ps: 'لیکوالان وایي کله چې یو ولس له بل حکومت څخه د جلا کېدو پرېکړه کوي، باید خپل لاملونه په ښکاره بیان کړي.',
    so: 'Qorayaashu waxay sheegayaan in marka dad ay go’aansadaan inay dowlad kale ka go’aan, ay tahay inay sababahooda si cad u sheegaan.',
    sw: 'Waandishi wanasema kwamba watu wanapoamua kujitenga na serikali nyingine, wanapaswa kueleza sababu zao hadharani.'
  },
  principles: {
    es: 'Las personas tienen derechos que el gobierno debe proteger. El poder justo viene del consentimiento del pueblo. Si un gobierno destruye esos derechos de manera constante, el pueblo puede cambiarlo o reemplazarlo.',
    ar: 'للناس حقوق يجب على الحكومة حمايتها. وتأتي السلطة العادلة من موافقة الشعب. وإذا استمرت الحكومة في تدمير تلك الحقوق، فيجوز للشعب تغييرها أو استبدالها.',
    ps: 'خلک داسې حقونه لري چې حکومت یې باید وساتي. عادلانه واک د خلکو له رضایت څخه راځي. که حکومت په دوامداره توګه دغه حقونه له منځه یوسي، خلک یې بدلولی شي.',
    so: 'Dadku waxay leeyihiin xuquuq ay dowladdu ilaaliso. Awoodda saxda ahi waxay ka timaaddaa oggolaanshaha dadka. Haddii dowladdu si joogto ah u burburiso xuquuqdaas, dadku way beddeli karaan.',
    sw: 'Watu wana haki ambazo serikali inapaswa kulinda. Mamlaka ya haki hutokana na ridhaa ya watu. Serikali ikiharibu haki hizo mara kwa mara, watu wanaweza kuibadilisha.'
  },
  grievances: {
    es: 'Esta sección presenta pruebas para apoyar la acusación de tiranía. Las quejas se concentran en las leyes, la representación, los tribunales, los impuestos, el ejército y la guerra.',
    ar: 'يعرض هذا القسم أدلة تدعم اتهام الاستبداد. وتركز الشكاوى على القوانين والتمثيل والمحاكم والضرائب والجيش والحرب.',
    ps: 'دا برخه د استبداد د تور د ملاتړ لپاره شواهد وړاندې کوي. شکایتونه پر قوانینو، استازیتوب، محکمو، مالیاتو، پوځ او جګړې تمرکز کوي.',
    so: 'Qaybtani waxay bixisaa caddeyn taageeraysa eedda dulmiga. Cabashooyinku waxay ku saabsan yihiin sharciyada, matalaadda, maxkamadaha, canshuuraha, ciidanka iyo dagaalka.',
    sw: 'Sehemu hii inatoa ushahidi wa kuunga mkono shtaka la udhalimu. Malalamiko yanahusu sheria, uwakilishi, mahakama, kodi, jeshi na vita.'
  },
  appeals: {
    es: 'Los colonos afirman que pidieron cambios de manera pacífica y advirtieron al pueblo británico, pero sus peticiones no resolvieron los problemas.',
    ar: 'يقول المستعمرون إنهم طلبوا التغيير سلميًا وحذروا الشعب البريطاني، لكن التماساتهم لم تحل المشكلات.',
    ps: 'مستعمره مېشتي وایي چې دوی په سوله ییز ډول د بدلون غوښتنه وکړه او برتانوي خلکو ته یې خبرداری ورکړ، خو غوښتنلیکونو یې ستونزې حل نه کړې.',
    so: 'Gumaystayaashu waxay sheegayaan inay si nabad ah isbeddel u codsadeen oo ay dadka Ingiriiska digniin siiyeen, laakiin codsiyadoodu dhibaatooyinka ma xallin.',
    sw: 'Wakoloni wanasema waliomba mabadiliko kwa amani na kuwaonya Waingereza, lakini maombi yao hayakutatua matatizo.'
  },
  independence: {
    es: 'Los representantes anuncian que las colonias son estados libres e independientes. Reclaman los poderes de países independientes y prometen apoyarse mutuamente.',
    ar: 'يعلن الممثلون أن المستعمرات أصبحت دولًا حرة ومستقلة. ويطالبون بسلطات الدول المستقلة ويتعهدون بدعم بعضهم بعضًا.',
    ps: 'استازي اعلان کوي چې مستعمرې ازاد او خپلواک دولتونه دي. هغوی د خپلواکو هېوادونو واکونه غواړي او د یو بل د ملاتړ ژمنه کوي.',
    so: 'Wakiilladu waxay ku dhawaaqayaan in gumaysiyadu yihiin dalal xor ah oo madax-bannaan. Waxay sheeganayaan awoodaha dalalka madaxa-bannaan, waxayna ballanqaadayaan inay is taageeraan.',
    sw: 'Wawakilishi wanatangaza kwamba makoloni ni nchi huru na zinazojitegemea. Wanadai mamlaka ya nchi huru na kuahidi kusaidiana.'
  },
  signers: {
    es: 'Los nombres muestran que delegados de las trece colonias respaldaron la Declaración. Firmar vinculó públicamente a cada delegado con la decisión.',
    ar: 'تُظهر الأسماء أن مندوبين من المستعمرات الثلاث عشرة أيدوا الإعلان. وقد ربط التوقيع كل مندوب علنًا بهذا القرار.',
    ps: 'نومونه ښيي چې د دیارلسو مستعمرو استازو د اعلامیې ملاتړ وکړ. لاسلیک هر استازی په ښکاره له دې پرېکړې سره وتاړه.',
    so: 'Magacyadu waxay muujinayaan in ergooyin ka socday saddex iyo tobankii gumaysi ay taageereen Baaqa. Saxiixu wuxuu ergo kasta si cad ugu xiray go’aanka.',
    sw: 'Majina yanaonyesha kuwa wajumbe kutoka makoloni kumi na matatu waliunga mkono Azimio. Kutia saini kulimhusisha kila mjumbe hadharani na uamuzi huo.'
  }
};
