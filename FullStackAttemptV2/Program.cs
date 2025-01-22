using Dapper;
using FullStackAttemptV2;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://127.0.0.1:5500")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();
var connStr = "Data Source=DESKTOP-PSDS24G\\SQLEXPRESS;Initial Catalog=ProfilesTest;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False";
app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.MapGet("/profiles", async () =>
{
    var sql = "SELECT * FROM Profiles";
    var conn = new SqlConnection(connStr);
    var profiles = await conn.QueryAsync<Profile>(sql);
    return profiles;
});

app.MapPost("profiles", async (Profile newProfile) =>
{
    var sql = "INSERT INTO Profiles (Name, Age, Country) VALUES (@Name, @Age, @Country)";
    var conn = new SqlConnection(connStr);
    var rowsAffected = await conn.ExecuteAsync(sql, new {newProfile.Name, newProfile.Age, newProfile.Country });
    return rowsAffected;
});

app.MapDelete("profiles/{id}", async (int id) =>
{
    var sql = "DELETE FROM Profiles WHERE Id = @Id";
    var conn = new SqlConnection(connStr);
    var rowsAffected = await conn.ExecuteAsync(sql, new { Id = id });
    return Results.Ok(rowsAffected);
});

app.MapPut("profiles/{id}", async (int id, Profile updatedProfile) =>
{
    var sql = "UPDATE Profiles SET Name = @Name, Age = @Age, Country = @Country WHERE Id = @Id";
    var conn = new SqlConnection(connStr);
    var rowsAffected = await conn.ExecuteAsync(sql, new {Id = id, updatedProfile.Name , updatedProfile.Age, updatedProfile.Country});
    return rowsAffected;
});

app.Run();