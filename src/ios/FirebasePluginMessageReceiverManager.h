#import "FirebasePluginMessageReceiver.h"

@interface FirebasePluginMessageReceiverManager : NSObject
+ (void) register:(FirebasePluginMessageReceiver *)receiver;
+ (void) unregister:(FirebasePluginMessageReceiver *)receiver;
+ (bool) sendNotification:(NSDictionary *)userInfo;
@end
