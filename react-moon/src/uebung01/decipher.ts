const cipherText = `Alsk Ansk Öw folsköou Lyg kögö jip Ußp tqqsö isa wuögö
ölsöz Fcskipi kökösßröp Lyg rolsjoö fiyfö glsuöp zlyg
wygdiö alö Upövvö pisuöp adss alö Upövvö pdiq Fiyfö köpdaö
diw Adw Fcskipi lwu lzzöp snyg ad
Gdoon wdku adw Fcskipi
Ngsö aös Fnvq ji röeökös fiyfö lyg snyg zdo sdyg
olsfw sdyg pöyguw diq alö Igp isa jiz Wygoiww diq adw Fcs
kipi
Gdoon wdkö lyg
Lyg rls köpdaö kökösßröp ölsköjnkös enoouö zlp Ölöp
fiygös rdyfös isa ad lwu zlp diqköqdooös adww lyg üöpköwwös
gdrö Ölöp ji fdiqös 
Lyg slyfö kögö ls alö Fßygö isa fnzzö zlu jeöl Ölöps
jipßyf
Ülöoös olörös Adsf wdku adw Fcskipi isa wuöyfu alö
Ölöp ls wölsös Röiuöo
Lyg slyfö isa öw üöpwygelsaöu glsuöp aöp kökösßröpolökös
aös Engsiskwußp Zlu zölsöz olsfös Jölköqlsköp ulvvö lyg
zlp zögpzdow diq zölsö Sdwöswvlujö  isa wygolömö alö Ußp
Rdoa adpdiq folsköou öw elöaöp Wnqnpu pölmö lyg alö Ußp diq
aöss lyg wuögö lzzöp snyg adglsuöp
Ng wdku adw Fcskipi ßröppdwygu Adw klsk dröp
wygsöoo Cg  Köpdaö lwu zlp diqköqdooös adww lyg diyg snyg
föls Wdoj gdrö 
Lyg slyfö kögö ls alö Fßygö isa fnzzö zlu ölsöz Wdoj
wupöiöp elöaöp
Ülöoös Adsf Eöss Wlö ülöooölygu snyg öls eöslk Zloyg
isa Zögo gcuuös 
Lyg slyfö isa kögö ls alö Fßygö Adw Fcskipi slzzu
dooöw röadsfu wlyg isa kögu Jeöl Zlsiuös wvcuöp folsköou öw
elöaöp Lyg tqqsö isa gdouö aöz Fcskipi Vqdssö isa To gls
Adsfö wdku adw Fcskipi kiu zluköadygu Eöss Wlö
ülöooölygu snyg ölsös Wygsööröwös gcuuös naöp öls Pßgp
köpcu 
Lyg slyfö isa kögö onw
Isa ülöooölygu ölsö Wygßwwöo jiz Zlbös piqu zlp adw
Fcskipi glsuöpgöp
Jögs Zlsiuös wvcuöp folsköou öw elöaöp
Föls Göpa  wdku adw Fcskipi sip
Lyg slyfö isa körö aös Eök qpöl
Koölyg pöyguw wdkö lyg
Adw Fcskipi kögu ls alö Fßygö isa lyg qnokö lgz Öw wuöoou
wlyg wn isköwyglyfu ds adww lyg alö Vqdssö ßröpsögzö
Eöss Wlö ülöooölygu snyg öuedw jiz Qßooös gcuuös 
wdku adw Fcskipi Risuöw Közßwö naöp kdp Gdyfqoölwyg
Gdyfqoölwyg zßwwuö lyg öpwu fdiqös wdkö lyg
Föls Vpnroöz Lyg gdr Jölu wdku adw Fcskipi Öw lwu ög
röwwöp eöss aöp Uölk snyg öuedw Oiqu röfnzzu
Lyg sögzö aös Wygoßwwöo ünz Gdfös
Dröp slygu ji Olao piqu zlp adw Fcskipi glsuöpgöp
Alö Dpröluwröalskiskös ad wlsa isuöp 
Lyg kögö down jiz Zöujköp isa fdiqö Gdyfqoölwyg Dow lyg
elöaöp lsw Gdiw fnzzö rököksöu zlp alö Sdygrdpls üns
isuös
Gdz Wö aös Söiös äöwögös qpdku wlö
Lyg slyfö
Sd aöp lwu äd engo nyg slyg üns glöp ed qpdku wlö isa
fpduju wlyg ds lgpöz Gluoöprcpuygös Sdußpolyg gdu wlö slygu
elpfolyg ölsös Rdpu Öw lwu ögöp öls Qodiz Öls Gluoöpqocizygös
Rdoa ßrdsögz alö üöpadzzuös Ußpfös alu ädsjö Gdiw
Lyg wygdiö snyg zdo kösdiöp gls Gz Ülöooölygu lwu öw
anyg öls Rcpuygös
Edu flöfös Wö aöss wn qpdku wlö
Lyg kodirö öw fnzzu diw Diwupdolös wdkö lyg
Gz Diwupdolös wdks Wö Fdss nyg wöls Drd öädo engöp
Alöwöp Lwodz zdygu zlp äöaösqdoow ädsj sdpütw`;

function count(cipherText: string): Map<string, number> {
    const chars = cipherText.split('');
    const ret: Map<string, number> = new Map();

    chars.forEach(char => {
        ret.set(char, (ret.get(char) ?? 0) + 1);
    });

    return ret;
};

console.log(count(cipherText));

function exec() {

}

export default exec;