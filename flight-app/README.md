Uçuş Rezervasyon Uygulaması
Bu uygulama, kullanıcıların uçuşları aramasına, belirli kriterlere göre filtrelemesine ve seçtikleri uçuşları rezerve etmesine olanak tanır. Ayrıca kullanıcılar, rezervasyon yaptıkları uçuşları "Biletlerim" bölümüne kaydedebilir ve bu uçuşları yönetebilirler.

Özellikler
Uçuşları Getirme: Uçuşlar harici bir API'den alınarak listelenir.
Uçuş Filtreleme: Kullanıcılar tarih, kalkış ve varış noktalarına göre uçuşları filtreleyebilir.
Uçuş Rezervasyonu: Kullanıcılar seçtikleri uçuşları "Uçuşu Rezerve Et" butonuna basarak rezerve edebilir. Rezervasyon başarılı olduğunda bir modal ile bildirim gösterilir.
Biletlerim: Rezervasyon yapılan uçuşlar localStorage kullanılarak kaydedilir ve "Biletlerim" bölümünden görüntülenebilir veya silinebilir.
Kullanılan Teknolojiler
React: Kullanıcı arayüzünü oluşturmak için.
Tailwind CSS: Modern ve responsive tasarım için.
TypeScript: Güvenli tip kontrolü sağlamak için.
Node.js & Express: Sunucu tarafında uçuş verilerini işlemek için.
MongoDB: Uçuş verilerini ve rezervasyonları kaydetmek için.
Axios: API isteklerini yapmak için.

Kullanıcı Arayüzü
Uçuş Arama ve Listeleme: Uçuşları arayabilir ve listelenen uçuşlar üzerinde filtreleme yapabilirsiniz.
Rezervasyon Yapma: Uygulama üzerinden rezervasyon yapıp, başarılı işlemlerde modal ile onay alabilirsiniz.
Biletlerim Bölümü: Kaydedilen uçuşlarınızı görüntüleyebilir veya silebilirsiniz.

Kurulum ve Çalıştırma

1. Depoyu Klonlayın
git clone https://github.com/umutcyilmaz/AppFellasAirport.git

2. Proje Klasörüne Geçin
cd AppFellas

3. Gerekli Bağımlılıkları Yükleyin
Backend:
cd flights-backend
npm install
Frontend:
cd flight-app
npm install
