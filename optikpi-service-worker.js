self.addEventListener('push', function(event) {
    const notificationData = event.data.json();
    const options = {
      badge: notificationData?.badge,
      body: notificationData?.body,
      data: notificationData?.data,
      icon: notificationData?.icon,
      image: notificationData?.image,
      title: notificationData?.title,
      lang: notificationData?.lang,
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  
  // self.addEventListener('notificationclick', function(event) {
  //   event.notification.close();
  //   event.waitUntil(
  //     clients.openWindow('')
  //   );
  // });
  