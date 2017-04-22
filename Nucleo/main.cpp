#include "mbed.h"

Serial pc(SERIAL_TX, SERIAL_RX);

Ticker toggle_led_ticker;

DigitalOut led(LED2);
int happening;

DigitalOut pump(D2);
DigitalOut steam(D4);
DigitalOut element(D7);
DigitalOut filter(D8);

void toggle_led() {
    if (happening > 0) {
        led = true;
        happening--;
    } else {
        led = false;
    }
}

int main() {
    happening = false;
    led = false;
    pump = false;
    steam = false;
    element = false;
    filter = false;
    
    pc.printf("Initialized\n\r");
    toggle_led_ticker.attach(&toggle_led, 0.5);
    while (true) {
        if (pc.readable()) {
            char in = pc.getc();
            if (in != '\n')
            {
                char x = pc.getc();
                pc.printf("read %c : %c\n\r", in, x);
                happening += 2;
                switch (in) {
                    case 'i':
                        pump = false;
                        steam = false;
                        element = false;
                        filter = false;
                    case 'p':
                        pump = x == 'o';
                        break;
                    case 's':
                        steam = x == 'o';
                        break;
                    case 'e':
                        element = x == 'o';
                        break;
                    case 'f':
                        filter = x == 'o';
                        break;
                    default:
                        happening -= 2;
                }
            }
            
            //element = steam || filter || elementOverride;
        }
    }
}