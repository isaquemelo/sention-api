# Entidades

## User
Um *User* representa o cliente da aplicação. Fazem parte de sua estrutura os
campos *email* e *password* que hão de ser utilizados para autenticação do usuário.
Para garantir a segurança do armazenamento do dado, o campo *password* é
encriptado pelo *bcrypt* (descrito posteriormente), garantindo que o texto plano seja
criptografado e devidamente protegido. 

## Device
O *Device* dá-se como uma abstração de um microcontrolador, como por
exemplo, um ESP32. Ele é composto por *sensors* e *actuators*, que representam os
sensores e atuadores conectados no dispositivo em questão. Ademais, o *device* é
possuído por um usuário e toda manipulação dessa entidade deve ser autenticada
com as credenciais do possuidor.

## Sensor
O *Sensor* é a representação genérica de uma fonte de informação proveniente
de uma das portas do device.
Cada sensor possui seu comportamento e formato de dados, em sensores
analógicos temos o retorno de dados expressos em um único valor de tensão lido pelo
microcontrolador (0 até 3.3v mapeados digitalmente no intervalo de 0 a 4095). Já em
sensores com comunicação I2C, como o caso do BMP280, vários valores são
fornecidos (temperatura, pressão e altitude) e sua leitura não é feita de forma direta,
necessitando de manipulação. Dessa forma, cada tipo de sensor tem uma interface
distinta para consumo de dados, e para realizar a diferenciação entre os tipos de
interface de sensores é aplicado o uso do campo *type*, que é utilizado pelo
microcontrolador para selecionar qual interface deve ser usada para leitura.
Outrossim, essa entidade possui também um campo port que especifica de
qual porta serão lidos os dados. Esse campo pode representar apenas um valor ou
um conjunto de valores, como por exemplo para o caso da comunicação I2C que faz
uso das portas SCK e SDA.
Por fim, também é disposto o atributo name, que se trata de um nome para que
o usuário identifique o sensor com algo de sua preferência.

## SensorData
SensorData é a entidade que representa os dados que são provenientes do
sensor, podendo ser do tipo JSON ou inteiro dependendo da interface estabelecida
pelo fornecedor da informação. Tal variação dá-se com o intuito de possibilitar o
suporte a sensores que transmitem apenas um dado, ou vários dados, como
supracitado o BMP280.

## NotificationTrigger
O NotificationTrigger representa um gatilho que há de ser disparado através de
um valor provido pelo sensor, seu disparo é controlado através de uma condicional
lógica que é definida pelo campo logicOperator, que pode ser do tipo
GREATER_THAN ou LESS_THAN, representando o operador lógico “maior que” e
“menor que”, respectivamente. A condicional lógica será aplicada sob o valor do lido
do sensor e o campo value. Com o disparo do gatilho, o campo type é utilizado para
estabelecer o tipo da notificação que será enviada, inicialmente apenas será aceitável
o tipo de e-mail.
Para o caso dos sensores que transmitem mais de um valor, o campo
dataSource é responsável por identificar qual o valor deve ser utilizado para execução
da comparação lógica e definir o tratamento do gatilho.
Além destes campos, também são acrescidos os campos name e content, que
definem respectivamente o nome e conteúdo da notificação.

## Actuator
O Actuator é a representação de uma porta de saída do device e que pode
resultar em uma ação física realizada em um determinado ambiente. A porta em
questão é definida pelo campo port, estabelecendo a porta em que o atuador está
conectado ao dispositivo. Para a primeira implementação o firmware do
microcontrolador só suportará a saída binária (ligado ou desligado), no entanto, o 
campo type já prevê o suporte futuro com a saída de um valor de tensão qualquer
definido pelo usuário.
Assim como o sensor, também é fornecido um campo name com o mesmo
propósito de identificação para o uso do usuário.

## ActuatorTrigger
Assim como o NotificationTrigger, o ActuatorTrigger define um gatilho
fundamentando-se em uma condicional lógica com dados provenientes de um sensor.
Todavia, em caso de disparo do gatilho, o resultado será uma ação no atuador
associado, definido pelo campo action podendo resultar na ativação ou desativação
do atuador. Como supracitado, já é planejado a saída de um valor analógico, sendo
assim o campo action também poderia ser definido com um valor de 0 a 4095,
representando uma saída na escala de 0 a 3.3v, no entanto, não será suportado na
primeira versão do firmware.
Deve-se destacar que não é possível realizar alinhamento de operadores
dentro de um mesmo gatilho de atuação, propondo-se o desenvolvimento em
trabalhos futuros. Todavia, é possível que um atuador possua múltiplos gatilhos de
distintos sensores (fontes de informação).
Na figura 3.2 é exposto o diagrama de entidades e relacionamentos
evidenciando as entidades citadas previamente.



# Como rodar o projeto:

- Baixe o projeto
- Abra-o com o Visual Studio Code
- Com o Docker baixado, abra o terminal e digite ```setup-db.sh```
- Abra o Docker, no container "prismamysql", clique em START
- Abra o terminal e digite ```npm run dev```
- Abra outro terminal e digite ```npx prisma studio```
