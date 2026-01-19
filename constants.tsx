
import { Category } from './types';

// Using dummy audio URLs
const BASE_FOLDER = "/music";
const BASE_URL = "https://www.soundhelix.com/examples/mp3/";
const DUMMY_INSTRUMENTAL = `${BASE_URL}SoundHelix-Song-1.mp3`;
const DUMMY_FULL = `${BASE_URL}SoundHelix-Song-2.mp3`;


// ==================== CLOUDINARY CONFIGURATION ====================
const CLOUD_NAME = 'dihujgmwe';
const BASE_URL_CLOUD = 'https://res.cloudinary.com';
const CLOUDINARY_BASE = `${BASE_URL_CLOUD}/${CLOUD_NAME}/video/upload`;

// Optimizations that WORK (use 'f_mp3' only - we tested this works)
const OPTIMIZATIONS = 'f_mp3'; // Use only f_mp3 since q_auto:audio doesn't work with version

// Helper function to generate Cloudinary URLs WITH VERSION
const cloudinaryUrl = (publicId, version = 'v1768571922') => {
  return `${CLOUDINARY_BASE}/${OPTIMIZATIONS}/${version}/${publicId}.mp3`;
};

// Helper to choose between Cloudinary or local file
const audioUrl = (cloudinaryId, localPath, version = 'v1768571922') => {
  return cloudinaryId ? cloudinaryUrl(cloudinaryId, version) : localPath;
};


// ==================== ROUND 1 AUDIO FILES ====================
// Category 1: New Year Songs
const R1C1B1minus = audioUrl('Bubency-detskaya-minus_pyhep9', '/music/round1/Bubency-detskaya-minus.mp3');
const R1C1B1full = audioUrl('Bubency-detskaya_egddvx', '/music/round1/Bubency-detskaya.mp3');

const R1C1B2minus = audioUrl('v_lesu_rodilas_elochka-minus_jl95xw', '/music/round1/v_lesu_rodilas_elochka-minus.mp3');
const R1C1B2full = audioUrl('v_lesu_rodilas_elochka_ava2tn', '/music/round1/v_lesu_rodilas_elochka.mp3');

const R1C1B3minus = audioUrl('elochka_elka_lesnoj_aromat_minus_r46ke5', '/music/round1/elochka_elka_lesnoj_aromat_minus.mp3');
const R1C1B3full = audioUrl('elochka_elka_lesnoj_aromat_ygpqcp', '/music/round1/elochka_elka_lesnoj_aromat.mp3');

const R1C1B4minus = audioUrl('novogodnie-igrushki-minus_hbjhwq', '/music/round1/novogodnie-igrushki-minus.mp3');
const R1C1B4full = audioUrl('novogodnie-igrushki_wv0i3m', '/music/round1/novogodnie-igrushki.mp3');

// Category 2: Cinema Songs
const R1C2B1minus = audioUrl('tri-mushketera-minus_m00pud', '/music/round1/tri-mushketera-minus.mp3');
const R1C2B1full = audioUrl('tri-mushketera_pbxarx', '/music/round1/tri-mushketera.mp3');

const R1C2B2minus = audioUrl('zvenit-janvarskaja-vjuga-minus_ctftqa', '/music/round1/zvenit-janvarskaja-vjuga-minus.mp3');
const R1C2B2full = audioUrl('zvenit-janvarskaja-vjuga_mrwszb', '/music/round1/zvenit-janvarskaja-vjuga.mp3');

const R1C2B3minus = audioUrl('pesenka-o-medvedjah-minus_ccuru1', '/music/round1/pesenka-o-medvedjah-minus.mp3');
const R1C2B3full = audioUrl('pesenka-o-medvedjah_ptrxzr', '/music/round1/pesenka-o-medvedjah.mp3');

const R1C2B4minus = audioUrl('dzhentelmeny-udachi_dlwpir', '/music/round1/dzhentelmeny-udachi.mp3');
const R1C2B4full = audioUrl('dzhentelmeny-udachi_dlwpir', '/music/round1/dzhentelmeny-udachi.mp3'); // Same ID for both minus/full

// Category 3: School Songs
const R1C3B1minus = audioUrl('dvazhdy_dva_chetyre-minus_itvint', '/music/round1/dvazhdy_dva_chetyre-minus.mp3');
const R1C3B1full = audioUrl('dvazhdy_dva_chetyre_h4ps2v', '/music/round1/dvazhdy_dva_chetyre.mp3');

const R1C3B2minus = audioUrl('chemu-uchat_v_shkole-minus_wvevyw', '/music/round1/chemu-uchat_v_shkole-minus.mp3');
const R1C3B2full = audioUrl('chemu_uchat_v_shkole_neq4va', '/music/round1/chemu_uchat_v_shkole.mp3');

const R1C3B3minus = audioUrl('pesenka_pervoklassnika_minus_j5c4ho', '/music/round1/pesenka_pervoklassnika_minus.mp3');
const R1C3B3full = audioUrl('pesenka_pervoklassnika_aveqhs', '/music/round1/pesenka_pervoklassnika.mp3');

const R1C3B4minus = audioUrl('Moy-dobry-uchitel_minus_yi3kem', '/music/round1/Moy-dobry-uchitel_minus.mp3');
const R1C3B4full = audioUrl('Moy-dobry-uchitel_u30wy8', '/music/round1/Moy-dobry-uchitel.mp3');

// Category 4: Animals Songs
const R1C4B1minus = audioUrl('v_trave_sidel_kuznechik_minus_yfib4c', '/music/round1/v_trave_sidel_kuznechik_minus.mp3');
const R1C4B1full = audioUrl('v_trave_sidel_kuznechik_b6ghyx', '/music/round1/v_trave_sidel_kuznechik.mp3');

const R1C4B2minus = audioUrl('dva_veselyh_gusya_minus_prbjiv', '/music/round1/dva_veselyh_gusya_minus.mp3');
const R1C4B2full = audioUrl('dva_veselyh_gusya_jrlfds', '/music/round1/dva_veselyh_gusya.mp3');

const R1C4B3minus = audioUrl('chernyy-kot-minus_edfpoe', '/music/round1/chernyy-kot-minus.mp3');
const R1C4B3full = audioUrl('chernyy-kot_gw0k50', '/music/round1/chernyy-kot.mp3');

const R1C4B4minus = audioUrl('33_korovy_minus_wgviha', '/music/round1/33_korovy_minus.mp3');
const R1C4B4full = audioUrl('33_korovy_siv4yd', '/music/round1/33_korovy.mp3');

// ==================== ROUND 2 ====================

const R2C1B1minus = audioUrl('ulybka_minus_cbr12j', '/music/round2/ulybka_minus.mp3');
const R2C1B1full = audioUrl('ulybka_jq85hi', '/music/round2/ulybka.mp3');

const R2C1B2minus = audioUrl('nastoyashiy_drug_minus_eddrhy', '/music/round2/nastoyashiy_drug_minus.mp3');
const R2C1B2full = audioUrl('nastojashhij_drug_ovdl7u', '/music/round2/nastojashhij_drug.mp3');

const R2C1B3minus = audioUrl('my_malenkie_deti_minus_m1bkoj', '/music/round2/my_malenkie_deti_minus.mp3');
const R2C1B3full = audioUrl('my_malenkie_deti_ixn2ct', '/music/round2/my_malenkie_deti.mp3');

const R2C1B4minus = audioUrl('krylatye_kacheli_minus_exthl0', '/music/round2/krylatye_kacheli_minus.mp3');
const R2C1B4full = audioUrl('krylatye_kacheli_gmtcac', '/music/round2/krylatye_kacheli.mp3');


const R2C2B1minus = audioUrl('berezy-minus_sff6l8', '/music/round2/berezy-minus.mp3');
const R2C2B1full = '/music/round2/berezy.mpga'; // Note: .mpga extension - might be wrong

const R2C2B2minus = audioUrl('kak-upoitel-ny-v-rossii-vechera-minus_qo6pfx', '/music/round2/kak-upoitel-ny-v-rossii-vechera-minus.mp3');
const R2C2B2full = audioUrl('kak-upoitel-ny-v-rossii-vechera_por3ci', '/music/round2/kak-upoitel-ny-v-rossii-vechera.mp3');

const R2C2B3minus = audioUrl('s_chego_nachinaetsya_Rodina_minus_arxtzc', '/music/round2/s_chego_nachinaetsya_Rodina_minus.mp3');
const R2C2B3full = audioUrl('s_chego_nachinaetsya_Rodina_c4ghwp', '/music/round2/s_chego_nachinaetsya_Rodina.mp3');

const R2C2B4minus = audioUrl('russkoe-pole-minus_ruymua', '/music/round2/russkoe-pole-minus.mp3');
const R2C2B4full = audioUrl('russkoe-pole_vtnc6o', '/music/round2/russkoe-pole.mp3');


const R2C3B1minus = audioUrl('est-tolko-mig-minus_kk13xz', '/music/round2/est-tolko-mig-minus.mp3');
const R2C3B1full = audioUrl('est-tolko-mig_fmgvto', '/music/round2/est-tolko-mig.mp3');

const R2C3B2minus = audioUrl('pozvoni-mne-minus_yooxil', '/music/round2/pozvoni-mne-minus.mp3');
const R2C3B2full = audioUrl('pozvoni-mne_f628en', '/music/round2/pozvoni-mne.mp3');

const R2C3B3minus = audioUrl('tri-tankista-minus_ekrfdo', '/music/round2/tri-tankista-minus.mp3');
const R2C3B3full = audioUrl('tri-tankista_cb59ui', '/music/round2/tri-tankista.mp3');

const R2C3B4minus = audioUrl('smuglyanka-minus_ncekac', '/music/round2/smuglyanka-minus.mp3');
const R2C3B4full = audioUrl('smuglyanka_mtiuoy', '/music/round2/smuglyanka.mp3');

// Round 2 Category 4
const R2C4B1minus = audioUrl('landyshi-minus_xhiisn', '/music/round2/landyshi-minus.mp3');
const R2C4B1full = audioUrl('landyshi_xtruct', '/music/round2/landyshi.mp3');

const R2C4B2minus = audioUrl('snegIdiet-minus_qgkijc', '/music/round2/snegIdiet-minus.mp3');
const R2C4B2full = audioUrl('snegIdiet_am3d45', '/music/round2/snegIdiet.mp3');

const R2C4B3minus = audioUrl('NaDalneiyStanciiSoiydu-munus_rokslz', '/music/round2/NaDalneiyStanciiSoiydu-munus.mp3');
const R2C4B3full = audioUrl('NaDalneiyStanciiSoiydu_sxgbnr', '/music/round2/NaDalneiyStanciiSoiydu.mp3');

const R2C4B4minus = audioUrl('nadezhda_minus_h24xio', '/music/round2/nadezhda_minus.mp3');
const R2C4B4full = audioUrl('nadezhda_ujmrfc', '/music/round2/nadezhda.mp3');

// ==================== ROUND 3 ====================

const R3C1B1minus = audioUrl('YA_RUSSKIJ_minus_mo2rbx', '/music/round3/YA_RUSSKIJ_minus.mp3');
const R3C1B1full = audioUrl('YA_RUSSKIJ_ulwgeb', '/music/round3/YA_RUSSKIJ.mp3');

const R3C1B2minus = audioUrl('lyube_gimn_rossii_minus_cyooz2', '/music/round3/lyube_gimn_rossii_minus.mp3');
const R3C1B2full = audioUrl('lyube_gimn_rossii_zqowqc', '/music/round3/lyube_gimn_rossii.mp3');

const R3C1B3minus = audioUrl('proekt-zhit-minus_kzrsp4', '/music/round3/proekt-zhit-minus.mp3');
const R3C1B3full = audioUrl('proekt-zhit_k0jt6r', '/music/round3/proekt-zhit.mp3');

const R3C1B4minus = audioUrl('shaman-shaman-vstanem_minus_tedto9', '/music/round3/shaman-shaman-vstanem_minus.mp3');
const R3C1B4full = audioUrl('shaman-shaman-vstanem_hintiz', '/music/round3/shaman-shaman-vstanem.mp3');


const R3C2B1minus = audioUrl('vecher_brodit_minus_hpm3er', '/music/round3/vecher_brodit_minus.mp3');
const R3C2B1full = audioUrl('vecher_brodit_ez3vni', '/music/round3/vecher_brodit.mp3');

const R3C2B2minus = audioUrl('Milaya_moya_solnyshko_lesnoe_minus_lao6px', '/music/round3/Milaya_moya_solnyshko_lesnoe_minus.mp3');
const R3C2B2full = audioUrl('Milaya_moya_solnyshko_lesnoe_rgovy7', '/music/round3/Milaya_moya_solnyshko_lesnoe.mp3');

const R3C2B3minus = audioUrl('YUrij_Vizbor-Dombajskij_vals_minus_mugp6o', '/music/round3/YUrij_Vizbor-Dombajskij_vals_minus.mp3');
const R3C2B3full = audioUrl('YUrij_Vizbor-Dombajskij_vals_nkbqil', '/music/round3/YUrij_Vizbor-Dombajskij_vals.mp3');

const R3C2B4minus = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_minus_ckfder', '/music/round3/Valerij_Kaner_-_A_vse_konchaetsya_minus.mp3');
const R3C2B4full = audioUrl('Valerij_Kaner_-_A_vse_konchaetsya_kehaab', '/music/round3/Valerij_Kaner_-_A_vse_konchaetsya.mp3');


const R3C3B1minus = audioUrl('odnazhdy-morem-ya-plyla_minus_vqop94', '/music/round3/odnazhdy-morem-ya-plyla_minus.mp3');
const R3C3B1full = audioUrl('odnazhdy-morem-ya-plyla_b9qk4r', '/music/round3/odnazhdy-morem-ya-plyla.mp3');

const R3C3B2minus = audioUrl('da_ne_vecher_minus_ql59gq', '/music/round3/da_ne_vecher_minus.mp3');
const R3C3B2full = audioUrl('da_ne_vecher_kzkx9i', '/music/round3/da_ne_vecher.mp3');

const R3C3B3minus = audioUrl('Napilas_ya_pyana_minus_i9ifis', '/music/round3/Napilas_ya_pyana_minus.mp3');
const R3C3B3full = audioUrl('Napilas_ya_pyana_fuxrry', '/music/round3/Napilas_ya_pyana.mp3');

const R3C3B4minus = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_minus_l7l2tp', '/music/round3/minus-vot-kto-to-s-gorochki-spustilsya_minus.mp3');
const R3C3B4full = audioUrl('minus-vot-kto-to-s-gorochki-spustilsya_mid1se', '/music/round3/minus-vot-kto-to-s-gorochki-spustilsya.mp3');



const R3C4B1minus = audioUrl('deltaplan_minus_v4yvhf', '/music/round3/deltaplan_minus.mp3');
const R3C4B1full = audioUrl('deltaplan_njyjmo', '/music/round3/deltaplan.mp3');

const R3C4B2minus = audioUrl('plot_minus_ap5jyk', '/music/round3/plot_minus.mp3');
const R3C4B2full = audioUrl('plot_rwqxbq', '/music/round3/plot.mp3');	

const R3C4B3minus = audioUrl('MuzykaNasSviazala-minus_upocpy', '/music/round3/MuzykaNasSviazala-minus.mp3');
const R3C4B3full = audioUrl('MuzykaNasSviazala_c04h1c', '/music/round3/MuzykaNasSviazala.mp3');

const R3C4B4minus = audioUrl('Belye_rozy_minus_uggr9o', '/music/round3/Belye_rozy_minus.mp3');
const R3C4B4full = audioUrl('Belye_rozy_wgklth', '/music/round3/Belye_rozy.mp3');

// ==================== ROUND 4 ====================

const R4C1B1minus = audioUrl('kapitan-kapitan-ulybnites_minus_qechen', '/music/round4/kapitan-kapitan-ulybnites_minus.mp3');
const R4C1B1full = audioUrl('kapitan-kapitan-ulybnites_tjrbhp', '/music/round4/kapitan-kapitan-ulybnites.mp3');

const R4C1B2minus = audioUrl('ya_ubyu_tebya_lodochnik_minus_jzos0v', '/music/round4/ya_ubyu_tebya_lodochnik_minus.mp3');
const R4C1B2full = audioUrl('ya_ubyu_tebya_lodochnik_rsyk6a', '/music/round4/ya_ubyu_tebya_lodochnik.mp3');

const R4C1B3minus = audioUrl('pesenka-shofera-minus_uvrqev', '/music/round4/pesenka-shofera-minus.mp3');
const R4C1B3full = audioUrl('pesenka-shofera_itiv3b', '/music/round4/pesenka-shofera.mp3');

const R4C1B4minus = audioUrl('vse_mogut_koroli_minus_cloitv', '/music/round4/vse_mogut_koroli_minus.mp3');
const R4C1B4full = audioUrl('vse_mogut_koroli_whymlj', '/music/round4/vse_mogut_koroli.mp3');




const R4C2B1minus = audioUrl('ya_vstretil_Vas-minus_xpzsgo', '/music/round4/ya_vstretil_Vas-minus.mp3');
const R4C2B1full = audioUrl('ya_vstretil_Vas_mbhwzg', '/music/round4/ya_vstretil_Vas.mp3');

const R4C2B2minus = audioUrl('ochi-chernye-minus_usug0j', '/music/round4/ochi-chernye-minus.mp3');
const R4C2B2full = audioUrl('ochi-chernye_marugh', '/music/round4/ochi-chernye.mp3');

const R4C2B3minus = audioUrl('iz-daleka-dolgo-techet-reka-volga-minus_xhz9ay', '/music/round4/iz-daleka-dolgo-techet-reka-volga-minus.mp3');
const R4C2B3full = audioUrl('iz-daleka-dolgo-techet-reka-volga_vubrfo', '/music/round4/iz-daleka-dolgo-techet-reka-volga.mp3');

const R4C2B4minus = audioUrl('Gori_moya_zvezda_minus_rjkalc', '/music/round4/Gori_moya_zvezda_minus.mp3');
const R4C2B4full = audioUrl('Gori_moya_zvezda_oyiiyz', '/music/round4/Gori_moya_zvezda.mp3');






const R4C3B1minus = audioUrl('zvenit-yanvarskaya-vyuga-miunus_ud7wws', '/music/round4/zvenit-yanvarskaya-vyuga-miunus.mp3');
const R4C3B1full = audioUrl('zvenit-yanvarskaya-vyuga_ftkwkk', '/music/round4/zvenit-yanvarskaya-vyuga.mp3');

const R4C3B2minus = audioUrl('belye-snezhinki-minus_rbeer1', '/music/round4/belye-snezhinki-minus.mp3');
const R4C3B2full = audioUrl('belye-snezhinki_qlznjl', '/music/round4/belye-snezhinki.mp3');

const R4C3B3minus = audioUrl('a-sneg-idet-minus_zb5kmn', '/music/round4/a-sneg-idet-minus.mp3');
const R4C3B3full = audioUrl('a-sneg-idet_zjq1yz', '/music/round4/a-sneg-idet.mp3');

const R4C3B4minus = audioUrl('tri_belykh_konja_minus_w08ixy', '/music/round4/tri_belykh_konja_minus.mp3');
const R4C3B4full = audioUrl('tri_belykh_konja_a5nho4', '/music/round4/tri_belykh_konja.mp3');



const R4C4B1minus = audioUrl('Ne_plach_Alisa_minus_jxgzpq', '/music/round4/Ne_plach_Alisa_minus.mp3');
const R4C4B1full = audioUrl('Ne_plach_Alisa_d65ppd', '/music/round4/Ne_plach_Alisa.mp3');

const R4C4B2minus = audioUrl('nikolaev_igor_den_rozhdeniya_minus_zwlatc', '/music/round4/nikolaev_igor_den_rozhdeniya_minus.mp3');
const R4C4B2full = audioUrl('nikolaev_igor_den_rozhdeniya_c7fp0y', '/music/round4/nikolaev_igor_den_rozhdeniya.mp3');

const R4C4B3minus = audioUrl('chay-vdvoem-den-rozhdeniya_minus_nilcuf', '/music/round4/chay-vdvoem-den-rozhdeniya_minus.mp3');
const R4C4B3full = audioUrl('chay-vdvoem-den-rozhdeniya_uybsfs', '/music/round4/chay-vdvoem-den-rozhdeniya.mp3');

const R4C4B4minus = audioUrl('Irina_Alegrova_-_s_dnem_rozhdeniya-minus_vgfiwg', '/music/round4/Irina_Alegrova_-_s_dnem_rozhdeniya-minus.mp3');
const R4C4B4full = audioUrl('Irina_Alegrova_-_s_dnem_rozhdeniya_cjrkaa', '/music/round4/Irina_Alegrova_-_s_dnem_rozhdeniya.mp3');



// ==================== ROUND 5 ====================

const R5R11minus = audioUrl('ulybka_minus_cut_jsvcut', '/music/round5/1/ulybka_minus_cut.mp3');
const R5R11full = audioUrl('ulybka_wu1dge', '/music/round5/1/ulybka.mp3');


const R5R12minus = audioUrl('sneg-kruzhitsya-minus_v5xkti', '/music/round5/1/sneg-kruzhitsya-minus.mp3');
const R5R12full = audioUrl('sneg-kruzhitsya_xcm1ww', '/music/round5/1/sneg-kruzhitsya.mp3');


const R5R13minus = audioUrl('spi-moya-radost-usni-minus_twfybb', '/music/round5/1/spi-moya-radost-usni-minus.mp3');
const R5R13full = audioUrl('spi-moya-radost-usni_syg4kr', '/music/round5/1/spi-moya-radost-usni.mp3');


const R5R14minus = audioUrl('Vsyo_chto_v_zhizni_est_u_menya_minus_ox94kc', '/music/round5/1/Vsyo_chto_v_zhizni_est_u_menya_minus.mp3');
const R5R14full = audioUrl('Vsyo_chto_v_zhizni_est_u_menya_injifz', '/music/round5/1/Vsyo_chto_v_zhizni_est_u_menya.mp3');

const R5R15minus = audioUrl('Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_minus_h6biey', '/music/round5/1/Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_minus.mp3');
const R5R15full = audioUrl('Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine_qjyopt', '/music/round5/1/Reet_v_vyshine_olimpiada_80_minus_-_reet_v_vyshine.mp3');

const R5R16minus = audioUrl('brilliantovaya_ruka_105-minus_uclxez', '/music/round5/1/brilliantovaya_ruka_105-minus.mp3');
const R5R16full = audioUrl('brilliantovaya_ruka_105_ou82sg', '/music/round5/1/brilliantovaya_ruka_105.mp3');

const R5R17minus = audioUrl('igor-sklyar-komarovo-minus_opjmub', '/music/round5/1/igor-sklyar-komarovo-minus.mp3');
const R5R17full = audioUrl('igor-sklyar-komarovo_ov121n', '/music/round5/1/igor-sklyar-komarovo.mp3');


//////////////Round 5-2

const R5R21minus = audioUrl('Moskva_slezam_ne_verit_minus_cut_tbwvxu', '/music/round5/2/Moskva_slezam_ne_verit_minus_cut.mp3');
const R5R21full = audioUrl('Moskva_slezam_ne_verit_bgy5go', '/music/round5/2/Moskva_slezam_ne_verit.mp3');

const R5R22minus = audioUrl('krylatye_kacheli_minus_cut_zymfnb', '/music/round5/2/krylatye_kacheli_minus_cut.mp3');
const R5R22full = audioUrl('krylatye_kacheli_onunkp', '/music/round5/2/krylatye_kacheli.mp3');


const R5R23minus = audioUrl('trus_ne_igraet_v_hokkej_minus_xgbt7c', '/music/round5/2/trus_ne_igraet_v_hokkej_minus.mp3');
const R5R23full = audioUrl('trus_ne_igraet_v_hokkej_sxcgox', '/music/round5/2/trus_ne_igraet_v_hokkej.mp3');

const R5R24minus = audioUrl('IashagaiuPoMoskve-NikitaMihalkov-minus_nifidh', '/music/round5/2/IashagaiuPoMoskve-NikitaMihalkov-minus.mp3');
const R5R24full = audioUrl('IashagaiuPoMoskve-NikitaMihalkov_li8scg', '/music/round5/2/IashagaiuPoMoskve-NikitaMihalkov.mp3');

const R5R25minus = audioUrl('ischu-tebya-iz-k-f-31-iyunya--minus1_v9xmsj', '/music/round5/2/ischu-tebya-iz-k-f-31-iyunya--minus1.mp3');
const R5R25full = audioUrl('ischu-tebya-iz-k-f-31-iyunya_aif0s0', '/music/round5/2/ischu-tebya-iz-k-f-31-iyunya.mp3');

const R5R26minus = audioUrl('olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_minus_on4rpr', '/music/round5/2/olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_minus.mp3');
const R5R26full = audioUrl('olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka_q2xumg', '/music/round5/2/olimpiada-v-sochi-do-svidan-ya-moy-laskovyy-mishka.mp3');

const R5R27minus = audioUrl('zamechatel-nyy-sosed-minus_f617jz', '/music/round5/2/zamechatel-nyy-sosed-minus.mp3');
const R5R27full = audioUrl('zamechatel-nyy-sosed_sqf2ux', '/music/round5/2/zamechatel-nyy-sosed.mp3');


//////////////Round 5-3


const R5R31minus = audioUrl('nastoyashiy_drug_minus_hf79gf', '/music/round5/3/nastoyashiy_drug_minus.mp3');
const R5R31full = audioUrl('nastoyashiy_drug_rgxpe8', '/music/round5/3/nastoyashiy_drug.mp3');

const R5R32minus = audioUrl('my_malenkie_deti_minus_cut_igpiue', '/music/round5/3/my_malenkie_deti_minus_cut.mp3');
const R5R32full = audioUrl('my_malenkie_deti_bidbr8', '/music/round5/3/my_malenkie_deti.mp3');

const R5R33minus = audioUrl('lesnoy-olen-minus_cut_slxeg7', '/music/round5/3/lesnoy-olen-minus_cut.mp3');
const R5R33full = audioUrl('lesnoy-olen_alsf9y', '/music/round5/3/lesnoy-olen.mp3');

const R5R34minus = audioUrl('kuda-uhodit-detstvo_minus_ont8wl', '/music/round5/3/kuda-uhodit-detstvo_minus.mp3');
const R5R34full = audioUrl('kuda-uhodit-detstvo_bgbpo7', '/music/round5/3/kuda-uhodit-detstvo.mp3');

const R5R35minus = audioUrl('yuriy-nikulin-esli-b-ya-byil-sultan-minus_yn2jry', '/music/round5/3/yuriy-nikulin-esli-b-ya-byil-sultan-minus.mp3');
const R5R35full = audioUrl('yuriy-nikulin-esli-b-ya-byil-sultan_dxwjw2', '/music/round5/3/yuriy-nikulin-esli-b-ya-byil-sultan.mp3');

const R5R36minus = audioUrl('razgovor-so-schast-em-minus-koroche_rhzrco', '/music/round5/3/razgovor-so-schast-em-minus-koroche.mp3');
const R5R36full = audioUrl('razgovor-so-schast-em_pvnq1z', '/music/round5/3/razgovor-so-schast-em.mp3');

const R5R37minus = audioUrl('Landyshi-GelenaVelikanova-minus_xbaf0v', '/music/round5/3/Landyshi-GelenaVelikanova-minus.mp3');
const R5R37full = audioUrl('Landyshi-GelenaVelikanova_k1vxod', '/music/round5/3/Landyshi-GelenaVelikanova.mp3');


//////////////Round 6

const R61 = audioUrl('pesenka-krokodila-geny-minus_ebmqsh', '/music/round6/pesenka-krokodila-geny-minus.mp3')
const R61f = audioUrl('pesenka-krokodila-geny_ggehic', '/music/round6/pesenka-krokodila-geny.mp3')

const R62 = audioUrl('kukushka-minus_cut_ncxht2', '/music/round6/kukushka-minus_cut.mp3')
const R62f = audioUrl('kukushka_ff7ce8', '/music/round6/kukushka.mp3')

const R63 = audioUrl('veter_peremen_minus_cut_powyye', '/music/round6/veter_peremen_minus_cut.mp3')
const R63f = audioUrl('veter_peremen_qgqsck', '/music/round6/veter_peremen.mp3')

const R64 = audioUrl('vyydu-noch-yu-v-pole-s-konem-minus_cut_mdphjn', '/music/round6/vyydu-noch-yu-v-pole-s-konem-minus_cut.mp3')
const R64f = audioUrl('vyydu-noch-yu-v-pole-s-konem_x004md', '/music/round6/vyydu-noch-yu-v-pole-s-konem-minus.mp3')

const R65 = audioUrl('antoshka_minus_ttcnms', '/music/round6/antoshka_minus.mp3')
const R65f = audioUrl('antoshka_fpdxti', '/music/round6/antoshka.mp3')

const R66 = audioUrl('dva_kusocheka_kolbaski-minus_cut_ufsdnx', '/music/round6/dva_kusocheka_kolbaski-minus_cut.mp3')
const R66f = audioUrl('dva_kusocheka_kolbaski_murtq8', '/music/round6/dva_kusocheka_kolbaski.mp3')

const R67 = audioUrl('dolche_gabanna-minus_cut_g8ncuk', '/music/round6/dolche_gabanna-minus_cut.mp3')
const R67f = audioUrl('dolche_gabanna_pj56fm', '/music/round6/dolche_gabanna.mp3')

const R68 = audioUrl('katjusha-minus_cut_y2erml', '/music/round6/katjusha-minus_cut.mp3')
const R68f = audioUrl('katjusha_bvwmml', '/music/round6/katjusha.mp3')

const R69 = audioUrl('nadezhda-kadysheva-techet-ruchey-minus_cut_gqo3pd', '/music/round6/nadezhda-kadysheva-techet-ruchey-minus_cut.mp3')
const R69f = audioUrl('nadezhda-kadysheva-techet-ruchey_fawp80', '/music/round6/nadezhda-kadysheva-techet-ruchey.mp3')

const R610 = audioUrl('topolinii_puh_minus_k2p4ks', '/music/round6/topolinii_puh_minus.mp3')
const R610f = audioUrl('topolinii_puh_u8pn0f', '/music/round6/topolinii_puh.mp3')



export const ROUND_DATA: { [roundId: number]: Category[] } = {
  1: [
    {
      id: 'newyear',
      name: { en: 'New Year', ru: 'Ноый Год' },
      songs: [
        { id: 'p1_1', title: 'Song 1', artist: 'Artist 1', audioUrl: R1C1B1minus, audioUrlFull: R1C1B1full },
        { id: 'p1_2', title: 'Song 2', artist: 'Artist 2', audioUrl: R1C1B2minus, audioUrlFull: R1C1B2full },
        { id: 'p1_3', title: 'Song 3', artist: 'Artist 3', audioUrl: R1C1B3minus, audioUrlFull: R1C1B3full },
        { id: 'p1_4', title: 'Song 4', artist: 'Artist 4', audioUrl: R1C1B4minus, audioUrlFull: R1C1B4full },
      ]
    },
    {
      id: 'cinema2026',
      name: { en: 'Cinema', ru: 'Кино' },
      songs: [
        { id: 'r1_1', title: 'Rock 1', artist: 'Artist 1', audioUrl: R1C2B1minus, audioUrlFull: R1C2B1full },
        { id: 'r1_2', title: 'Rock 2', artist: 'Artist 2', audioUrl: R1C2B2minus, audioUrlFull: R1C2B2full },
        { id: 'r1_3', title: 'Rock 3', artist: 'Artist 3', audioUrl: R1C2B3minus, audioUrlFull: R1C2B3full },
        { id: 'r1_4', title: 'Rock 4', artist: 'Artist 4', audioUrl: R1C2B4minus, audioUrlFull: R1C2B4full },
      ]
    },
    {
      id: 'cinema1',
      name: { en: 'School', ru: 'Школа' },
      songs: [
        { id: 'c1_1', title: 'Movie 1', artist: 'Artist 1', audioUrl: R1C3B1minus, audioUrlFull: R1C3B1full },
        { id: 'c1_2', title: 'Movie 2', artist: 'Artist 2', audioUrl: R1C3B2minus, audioUrlFull: R1C3B2full },
        { id: 'c1_3', title: 'Movie 3', artist: 'Artist 3', audioUrl: R1C3B3minus, audioUrlFull: R1C3B3full },
        { id: 'c1_4', title: 'Movie 4', artist: 'Artist 4', audioUrl: R1C3B4minus, audioUrlFull: R1C3B4full },
      ]
    },
    {
      id: 'anumals',
      name: { en: 'Our smaller brothers', ru: 'Братья наши меньшие' },
      songs: [
        { id: 'rt1_1', title: 'Retro 1', artist: 'Artist 1', audioUrl: R1C4B1minus, audioUrlFull: R1C4B1full },
        { id: 'rt1_2', title: 'Retro 2', artist: 'Artist 2', audioUrl: R1C4B2minus, audioUrlFull: R1C4B2full },
        { id: 'rt1_3', title: 'Retro 3', artist: 'Artist 3', audioUrl: R1C4B3minus, audioUrlFull: R1C4B3full },
        { id: 'rt1_4', title: 'Retro 4', artist: 'Artist 4', audioUrl: R1C4B4minus, audioUrlFull: R1C4B4full },
      ]
    }
  ],
  2: [
    {
      id: 'children',
      name: { en: 'Childrens songs', ru: 'Детские песни' },
      songs: [
        { id: 'j2_1', title: 'Jazz 1', artist: 'Artist 1', audioUrl: R2C1B1minus, audioUrlFull: R2C1B1full },
        { id: 'j2_2', title: 'Jazz 2', artist: 'Artist 2', audioUrl: R2C1B2minus, audioUrlFull: R2C1B2full },
        { id: 'j2_3', title: 'Jazz 3', artist: 'Artist 3', audioUrl: R2C1B3minus, audioUrlFull: R2C1B3full },
        { id: 'j2_4', title: 'Jazz 4', artist: 'Artist 4', audioUrl: R2C1B4minus, audioUrlFull: R2C1B4full },
      ]
    },
    {
      id: 'russia',
      name: { en: 'Russia', ru: 'Россия' },
      songs: [
        { id: 'g2_1', title: 'Game 1', artist: 'Artist 1', audioUrl: R2C2B1minus, audioUrlFull: R2C2B1full },
        { id: 'g2_2', title: 'Game 2', artist: 'Artist 2', audioUrl: R2C2B2minus, audioUrlFull: R2C2B2full },
        { id: 'g2_3', title: 'Game 3', artist: 'Artist 3', audioUrl: R2C2B3minus, audioUrlFull: R2C2B3full },
        { id: 'g2_4', title: 'Game 4', artist: 'Artist 4', audioUrl: R2C2B4minus, audioUrlFull: R2C2B4full },
      ]
    },
    {
      id: 'cinema2026',
      name: { en: 'Soviet films', ru: 'Советские фильмы' },
      songs: [
        { id: 'ct2_1', title: 'Toon 1', artist: 'Artist 1', audioUrl: R2C3B1minus, audioUrlFull: R2C3B1full },
        { id: 'ct2_2', title: 'Toon 2', artist: 'Artist 2', audioUrl: R2C3B2minus, audioUrlFull: R2C3B2full },
        { id: 'ct2_3', title: 'Toon 3', artist: 'Artist 3', audioUrl: R2C3B3minus, audioUrlFull: R2C3B3full },
        { id: 'ct2_4', title: 'Toon 4', artist: 'Artist 4', audioUrl: R2C3B4minus, audioUrlFull: R2C3B4full },
      ]
    },
    {
      id: 'hit60',
      name: { en: 'Hits of the 60s and 70s', ru: 'Хиты 60-х и 70-х годов' },
      songs: [
        { id: 'cl2_1', title: 'Classic 1', artist: 'Artist 1', audioUrl: R2C4B1minus, audioUrlFull: R2C4B1full },
        { id: 'cl2_2', title: 'Classic 2', artist: 'Artist 2', audioUrl: R2C4B2minus, audioUrlFull: R2C4B2full },
        { id: 'cl2_3', title: 'Classic 3', artist: 'Artist 3', audioUrl: R2C4B3minus, audioUrlFull: R2C4B3full },
        { id: 'cl2_4', title: 'Classic 4', artist: 'Artist 4', audioUrl: R2C4B4minus, audioUrlFull: R2C4B4full },
      ]
    }
  ],
  3: [
    {
      id: 'patriot',
      name: { en: 'Patriot', ru: 'Патриот' },
      songs: [
        { id: 'e3_1', title: 'Synth 1', artist: 'Artist 1', audioUrl: R3C1B1minus, audioUrlFull: R3C1B1full },
        { id: 'e3_2', title: 'Synth 2', artist: 'Artist 2', audioUrl: R3C1B2minus, audioUrlFull: R3C1B2full },
        { id: 'e3_3', title: 'Synth 3', artist: 'Artist 3', audioUrl: R3C1B3minus, audioUrlFull: R3C1B3full },
        { id: 'e3_4', title: 'Synth 4', artist: 'Artist 4', audioUrl: R3C1B4minus, audioUrlFull: R3C1B4full },
      ]
    },
    {
      id: 'tourists',
      name: { en: 'Tourist', ru: 'Туристическая' },
      songs: [
        { id: 'b3_1', title: 'Blues 1', artist: 'Artist 1', audioUrl: R3C2B1minus, audioUrlFull: R3C2B1full },
        { id: 'b3_2', title: 'Blues 2', artist: 'Artist 2', audioUrl: R3C2B2minus, audioUrlFull: R3C2B2full },
        { id: 'b3_3', title: 'Blues 3', artist: 'Artist 3', audioUrl: R3C2B3minus, audioUrlFull: R3C2B3full },
        { id: 'b3_4', title: 'Blues 4', artist: 'Artist 4', audioUrl: R3C2B4minus, audioUrlFull: R3C2B4full },
      ]
    },
    {
      id: 'table',
      name: { en: 'Table', ru: 'Застольная' },
      songs: [
        { id: 'co3_1', title: 'Country 1', artist: 'Artist 1', audioUrl: R3C3B1minus, audioUrlFull: R3C3B1full },
        { id: 'co3_2', title: 'Country 2', artist: 'Artist 2', audioUrl: R3C3B2minus, audioUrlFull: R3C3B2full },
        { id: 'co3_3', title: 'Country 3', artist: 'Artist 3', audioUrl: R3C3B3minus, audioUrlFull: R3C3B3full },
        { id: 'co3_4', title: 'Country 4', artist: 'Artist 4', audioUrl: R3C3B4minus, audioUrlFull: R3C3B4full },
      ]
    },
    {
      id: 'hits80',
      name: { en: 'Hits of the 80s', ru: 'Хиты 80-х' },
      songs: [
        { id: 'm3_1', title: 'Metal 1', artist: 'Artist 1', audioUrl: R3C4B1minus, audioUrlFull: R3C4B1full },
        { id: 'm3_2', title: 'Metal 2', artist: 'Artist 2', audioUrl: R3C4B2minus, audioUrlFull: R3C4B2full },
        { id: 'm3_3', title: 'Metal 3', artist: 'Artist 3', audioUrl: R3C4B3minus, audioUrlFull: R3C4B3full },
        { id: 'm3_4', title: 'Metal 4', artist: 'Artist 4', audioUrl: R3C4B4minus, audioUrlFull: R3C4B4full },
      ]
    }
  ],
  4: [
    {
      id: 'prof',
      name: { en: 'Professions', ru: 'Профессии' },
      songs: [
        { id: 'a4_1', title: 'Anime 1', artist: 'Artist 1', audioUrl: R4C1B1minus, audioUrlFull: R4C1B1full },
        { id: 'a4_2', title: 'Anime 2', artist: 'Artist 2', audioUrl: R4C1B2minus, audioUrlFull: R4C1B2full },
        { id: 'a4_3', title: 'Anime 3', artist: 'Artist 3', audioUrl: R4C1B3minus, audioUrlFull: R4C1B3full },
        { id: 'a4_4', title: 'Anime 4', artist: 'Artist 4', audioUrl: R4C1B4minus, audioUrlFull: R4C1B4full },
      ]
    },
    {
      id: 'romances',
      name: { en: 'Romances', ru: 'Романсы' },
      songs: [
        { id: 'k4_1', title: 'KPop 1', artist: 'Artist 1', audioUrl: R4C2B1minus, audioUrlFull: R4C2B1full },
        { id: 'k4_2', title: 'KPop 2', artist: 'Artist 2', audioUrl: R4C2B2minus, audioUrlFull: R4C2B2full },
        { id: 'k4_3', title: 'KPop 3', artist: 'Artist 3', audioUrl: R4C2B3minus, audioUrlFull: R4C2B3full },
        { id: 'k4_4', title: 'KPop 4', artist: 'Artist 4', audioUrl: R4C2B4minus, audioUrlFull: R4C2B4full },
      ]
    },
    {
      id: 'r4_cat3',
      name: { en: 'Winter', ru: 'Песни о зиме' },
      songs: [
        { id: 'ra4_1', title: 'Rap 1', artist: 'Artist 1', audioUrl: R4C3B1minus, audioUrlFull: R4C3B1full },
        { id: 'ra4_2', title: 'Rap 2', artist: 'Artist 2', audioUrl: R4C3B2minus, audioUrlFull: R4C3B2full },
        { id: 'ra4_3', title: 'Rap 3', artist: 'Artist 3', audioUrl: R4C3B3minus, audioUrlFull: R4C3B3full },
        { id: 'ra4_4', title: 'Rap 4', artist: 'Artist 4', audioUrl: R4C3B4minus, audioUrlFull: R4C3B4full },
      ]
    },
    {
      id: 'r4_cat4',
      name: { en: 'Birthday', ru: 'День Рождения' },
      songs: [
        { id: 'f4_1', title: 'Folk 1', artist: 'Artist 1', audioUrl: R4C4B1minus, audioUrlFull: R4C4B1full },
        { id: 'f4_2', title: 'Folk 2', artist: 'Artist 2', audioUrl: R4C4B2minus, audioUrlFull: R4C4B2full },
        { id: 'f4_3', title: 'Folk 3', artist: 'Artist 3', audioUrl: R4C4B3minus, audioUrlFull: R4C4B3full },
        { id: 'f4_4', title: 'Folk 4', artist: 'Artist 4', audioUrl: R4C4B4minus, audioUrlFull: R4C4B4full },
      ]
    }
  ],
    5: [
    {
      id: 'r5_sprint',
      name: { en: 'Sprint Round', ru: 'Спринт' },
      songs: [
        // Songs for Player 1
        { id: 's5_1', title: 'Sprint 1 (P1)', artist: 'Artist 1', audioUrl: R5R11minus, audioUrlFull: R5R11full },
        { id: 's5_2', title: 'Sprint 2 (P1)', artist: 'Artist 2', audioUrl: R5R12minus, audioUrlFull: R5R12full },
        { id: 's5_3', title: 'Sprint 3 (P1)', artist: 'Artist 3', audioUrl: R5R13minus, audioUrlFull: R5R13full },
        { id: 's5_4', title: 'Sprint 4 (P1)', artist: 'Artist 4', audioUrl: R5R14minus, audioUrlFull: R5R14full },
        { id: 's5_5', title: 'Sprint 5 (P1)', artist: 'Artist 5', audioUrl: R5R15minus, audioUrlFull: R5R15full },
        { id: 's5_6', title: 'Sprint 6 (P1)', artist: 'Artist 6', audioUrl: R5R16minus, audioUrlFull: R5R16full },
        { id: 's5_7', title: 'Sprint 7 (P1)', artist: 'Artist 7', audioUrl: R5R17minus, audioUrlFull: R5R17full },
        
        // Songs for Player 2 (8-14)
        { id: 's5_8', title: 'Sprint 1 (P2)', artist: 'Artist 8', audioUrl: R5R21minus, audioUrlFull: R5R21full },
        { id: 's5_9', title: 'Sprint 2 (P2)', artist: 'Artist 9', audioUrl: R5R22minus, audioUrlFull: R5R22full },
        { id: 's5_10', title: 'Sprint 3 (P2)', artist: 'Artist 10', audioUrl: R5R23minus, audioUrlFull: R5R23full },
        { id: 's5_11', title: 'Sprint 4 (P2)', artist: 'Artist 11', audioUrl: R5R24minus, audioUrlFull: R5R24full },
        { id: 's5_12', title: 'Sprint 5 (P2)', artist: 'Artist 12', audioUrl: R5R25minus, audioUrlFull: R5R25full },
        { id: 's5_13', title: 'Sprint 6 (P2)', artist: 'Artist 13', audioUrl: R5R26minus, audioUrlFull: R5R26full },
        { id: 's5_14', title: 'Sprint 7 (P2)', artist: 'Artist 14', audioUrl: R5R27minus, audioUrlFull: R5R27full },
        
        // Songs for Player 3 (15-21)
        { id: 's5_15', title: 'Sprint 1 (P3)', artist: 'Artist 15', audioUrl: R5R31minus, audioUrlFull: R5R31full },
        { id: 's5_16', title: 'Sprint 2 (P3)', artist: 'Artist 16', audioUrl: R5R32minus, audioUrlFull: R5R32full },
        { id: 's5_17', title: 'Sprint 3 (P3)', artist: 'Artist 17', audioUrl: R5R33minus, audioUrlFull: R5R33full },
        { id: 's5_18', title: 'Sprint 4 (P3)', artist: 'Artist 18', audioUrl: R5R34minus, audioUrlFull: R5R34full },
        { id: 's5_19', title: 'Sprint 5 (P3)', artist: 'Artist 19', audioUrl: R5R35minus, audioUrlFull: R5R35full },
        { id: 's5_20', title: 'Sprint 6 (P3)', artist: 'Artist 20', audioUrl: R5R36minus, audioUrlFull: R5R36full },
        { id: 's5_21', title: 'Sprint 7 (P3)', artist: 'Artist 21', audioUrl: R5R37minus, audioUrlFull: R5R37full },
      ]
    }
  ],
   6: [
    {
      id: 'r6_final',
      name: { en: 'Super Game', ru: 'Супер-игра' },
      songs: [
        {
          id: 'sg1',
          title: 'Smooth Criminal',
          artist: 'Michael Jackson',
          audioUrl: R61,
          audioUrlFull: R61f,
          hint: {
            en: 'This song sounds in the moment of loneliness. In the song there are noisy running heroes. In the song there is a contrast between the grayness of the surrounding world and the joyful occasion.',
            ru: 'Эта песня звучит в момент одиночества. В песне есть шумные бегущие герои, подчеркивается контраст между серостью окружающего мира и радостным поводом.'
          }
        },
        {
          id: 'sg2',
          title: 'Billie Jean',
          artist: 'Michael Jackson',
          audioUrl: R62,
          audioUrlFull: R62f,
          hint: {
            en: 'A song about someone who can tell you the allotted time of life.',
            ru: 'Песня про того, кто может сообщить отмеренное время жизни.'
          }
        },
        {
          id: 'sg3',
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
	  audioUrl: R63,
          audioUrlFull: R63f,
          hint: {
            en: 'A song about a natural phenomenon that brings change.',
            ru: 'Песня про явление природы которое приносит изменения.'
          }
        },
        {
          id: 'sg4',
          title: 'Take On Me',
          artist: 'a-ha',
          audioUrl: R64,
          audioUrlFull: R64f,
          hint: {
            en: 'In this song, forward movement occurs in silence, under the gaze of countless witnesses who will never speak. It features two companions, one alive, the other seemingly eternal. Together, they move through space and time.',
            ru: 'В этой песне движение вперёд происходит в тишине, под взглядом бесчисленных свидетелей, которые никогда не скажут ни слова. В ней есть два спутника, один из которых живой, а другой кажется вечным. Вместе они идут сквозь пространство и время.'
          }
        },
        {
          id: 'sg5',
          title: 'Rolling in the Deep',
          artist: 'Adele',
	  audioUrl: R65,
          audioUrlFull: R65f,
          hint: {
            en: 'When the hero of this song encounters something completely new and unexpected, his reaction is: "Did this really happen in the textbook?"',
            ru: 'Когда герой этой песни сталкивается с чем-то совершенно новым и неожиданным, его реакция — это: "А это точно было в учебнике?"'
          }
        },
        // Add 5 more songs (sg6 to sg10)
        {
          id: 'sg6',
          title: 'Song 6 Title',
          artist: 'Artist 6',
	  audioUrl: R66,
          audioUrlFull: R66f,
          hint: {
            en: 'The song talks about things that symbolize important moments in life when two people begin a new stage.',
            ru: 'В песне говорится о вещах, которые символизируют важные моменты жизни, когда два человека начинают новый этап.  '
          }
        },
        {
          id: 'sg7',
          title: 'Song 7 Title',
          artist: 'Artist 7',
          audioUrl: R67,
          audioUrlFull: R67f,
          hint: {
            en: 'A song about how coming of age can be a moment of excitement and anxiety, with deep doubts hidden behind an outward appearance of freedom.',
            ru: 'Песня о том, как наступление совершеннолетия может стать моментом волнения и тревоги, когда за внешней свободой скрываются глубокие сомнения.'
          }
        },
        {
          id: 'sg8',
          title: 'Song 8 Title',
          artist: 'Artist 8',
	  audioUrl: R68,
          audioUrlFull: R68f,
          hint: {
            en: 'A song about the strongest girl. Love for her has become a symbol of invincible power. The girl has a nickname: BM-13.',
            ru: 'Песня про самую сильную девушку. Любовь к ней превратилась в символ непобедимой мощи. У девушки есть nickname: БМ-13'
          }
        },
        {
          id: 'sg9',
          title: 'Song 9 Title',
          artist: 'Artist 9',
          audioUrl: R69,
          audioUrlFull: R69f,
          hint: {
            en: 'A melody often sung around a campfire. It speaks of how lifes paths can run parallel, very close, yet never merge into one, leaving a feeling of bright but inevitable loss.',
            ru: 'Мелодия, что жизненные пути могут идти параллельно, очень близко, но так и не слиться в один, оставив чувство светлой, но неизбежной утраты.'
          }
        },
        {
          id: 'sg10',
          title: 'Song 10 Title',
          artist: 'Artist 10',
	  audioUrl: R610,
          audioUrlFull: R610f,
          hint: {
            en: 'This song is the soundtrack to summer heat and light sadness. Her main character is summer snow.',
            ru: 'Эта песня — саундтрек к летней жаре и легкой грусти. Её главный герой — летний снег.'
          }
        }
      ]
    }
  ]
};

// Unique background music for each screen


const round_1 = audioUrl('round1_pq3xwg', '${BASE_FOLDER}/round1.mp3');
const round_2 = audioUrl('round1_pq3xwg', '${BASE_FOLDER}/round1.mp3');
const round_3 = audioUrl('round2_szwye2', '${BASE_FOLDER}/round2.mp3');
const round_4 = audioUrl('round2_szwye2', '${BASE_FOLDER}/round2.mp3');
const round_5 = audioUrl('round3_nhxxjh', '${BASE_FOLDER}/round3.mp3');
const round_6 = audioUrl('round3_nhxxjh', '${BASE_FOLDER}/round3.mp3');

const setup_mp3 = audioUrl('jazz_intro_umvfjb', '${BASE_FOLDER}/jazz_intro.mp3');
const start_mp3 = audioUrl('um_intro_ljemda', '${BASE_FOLDER}/intro.mp3');

export const SCREEN_BGM: { [key: string]: string } = {
  setup: setup_mp3,
  start: start_mp3,
  round_1: round_1,
  round_2: round_1,
  round_3: round_2,
  round_4: round_2,
  round_5: round_3,
  round_6: round_3,
};


/* export const SCREEN_BGM: { [key: string]: string } = {
  setup: `${BASE_FOLDER}/jazz_intro.mp3`,
  start: `${BASE_FOLDER}/intro.mp3`,
  round_1: `${BASE_FOLDER}/round1.mp3`,
  round_2: `${BASE_FOLDER}/round1.mp3`,
  round_3: `${BASE_FOLDER}/round2.mp3`,
  round_4: `${BASE_FOLDER}/round2.mp3`,
  round_5: `${BASE_FOLDER}/round3.mp3`,
  round_6: `${BASE_FOLDER}/round3.mp3`,
};*/

// One-shot sound effects

const select = audioUrl('50_50_svlsr5', '/music/50_50.mp3');
const correct = audioUrl('um_right_iu4vjb', '/music/um_right.mp3');
const wrong = audioUrl('um_wrong_s9a496', '/music/um_wrong.mp3');
const scoreboard = audioUrl('um_r3_win_spbcmk', '/music/um_r3_win.mp3');

export const SFX: { [key: string]: string } = {
  stop: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  select: audioUrl('50_50_svlsr5', '/music/50_50.mp3'),
  correct: audioUrl('um_right_iu4vjb', '/music/um_right.mp3'),
  wrong: audioUrl('um_wrong_s9a496', '/music/um_wrong.mp3'),
  scoreboard: audioUrl('um_r3_win_spbcmk', '/music/um_r3_win.mp3'),
};

/*export const SFX: { [key: string]: string } = {
  stop: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",          // Sound 1: Stop
  select: "/music/50_50.mp3",        // Sound 2: Note Select
  correct: "/music/um_right.mp3",       // Sound 3: Correct/Scores assigned
  wrong: "/music/um_wrong.mp3",         // Sound 4: Wrong/Scores not assigned
  scoreboard: "/music/um_r3_win.mp3",   // Scoreboard Open
};*/

export const INITIAL_POINTS = [10, 20, 30, 40];

export const shuffle = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

