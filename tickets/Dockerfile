# Estágio 1: Build (Construção)
# Usamos a imagem do Maven com JDK 17 (mesma versão do seu pom.xml)
FROM maven:3-eclipse-temurin-17 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o pom.xml e baixa as dependências (para aproveitar o cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o restante do código-fonte e compila a aplicação
COPY src ./src
RUN mvn package -DskipTests

# Estágio 2: Run (Execução)
# Usamos uma imagem JRE (Java Runtime Environment), que é menor
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Expõe a porta 4000 (definida no seu application.properties)
EXPOSE 4000

# Copia o .jar buildado do estágio anterior
# Atenção: verifique se o nome do artefato no seu pom.xml é 'sales'
COPY --from=builder /app/target/sales-0.0.1-SNAPSHOT.jar app.jar

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]