import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrito } from './Carrito';
import { Compra } from './Compra';
import { DetallesC } from './DetallesC';
import { Item } from './Item';
import { Rol } from './Rol';
import { Seccion } from './Seccion';
import { Usuario } from './Usuario';
import { Videojuego } from './VideoJuego';
import { map } from 'rxjs';
import { CarritoItem } from '../interfaces/carrito-item';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})

export class DbservicioService {
  rol: string = "CREATE TABLE IF NOT EXISTS rol (id_rolr INTEGER PRIMARY KEY, nombrer VARCHAR(10));";
  usuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuariou INTEGER PRIMARY KEY, emailu VARCHAR(30), nombre_usuariou VARCHAR(30)  NOT NULL, contrasenau VARCHAR(30) NOT NULL, nombreu VARCHAR(15), imagenu BLOB, rol_id INTEGER, rut VARCHAR(20), FOREIGN KEY (rol_id) REFERENCES rol(id_rolr));";
  seccion: string = "CREATE TABLE IF NOT EXISTS seccion (id_seccions INTEGER PRIMARY KEY, nombres VARCHAR(30));";
  juego: string = "CREATE TABLE IF NOT EXISTS videojuegos (id_juego INTEGER PRIMARY KEY, nombrev VARCHAR(50) NOT NULL, descripcion VARCHAR(500)  NOT NULL, precio REAL NOT NULL, imagenv BLOB  NOT NULL, seccion_id INTEGER NOT NULL, slug VARCHAR(50) UNIQUE, FOREIGN KEY (seccion_id) REFERENCES seccion(id_seccions));";
  compra: string = "CREATE TABLE IF NOT EXISTS compra (id_comprac INTEGER PRIMARY KEY, fechac DATE, rutc VARCHAR(20), totalc INTEGER, usuario_id INTEGER,FOREIGN KEY (usuario_id) REFERENCES usuario (id_usuariou));";
  detalles: string = "CREATE TABLE IF NOT EXISTS detallesc (id_detallesc INTEGER PRIMARY KEY, subtotal REAL, cantidad INTEGER, videojuego_id INTEGER, compra_id INTEGER, FOREIGN KEY (videojuego_id) REFERENCES videojuegos (id_juego),FOREIGN KEY (compra_id) REFERENCES compra (id_comprac));";
  carritoTablas: string = "CREATE TABLE IF NOT EXISTS carrito (id_carrito INTEGER PRIMARY KEY, usuario_id INTEGER, FOREIGN KEY (usuario_id) REFERENCES Usuario (id_usuariou));";
  item: string = "CREATE TABLE IF NOT EXISTS itemCarrito (id_itemcarrito INTEGER PRIMARY KEY, carrito_id INTEGER, videojuego_id INTEGER, cantidad INTEGER,FOREIGN KEY (carrito_id) REFERENCES carrito (id_carrito),FOREIGN KEY (videojuego_id) REFERENCES videojuegos (id_juego));";

  registro_seccion1: string = "INSERT or IGNORE INTO seccion(id_seccions,nombres) VALUES(1,'Playstation');";
  registro_seccion2: string = "INSERT or IGNORE INTO seccion(id_seccions,nombres) VALUES(2,'Xbox');";
  registro_seccion4: string = "INSERT or IGNORE INTO seccion(id_seccions,nombres) VALUES(3,'PC');";
  registro_seccion3: string = "INSERT or IGNORE INTO seccion(id_seccions,nombres) VALUES(4,'Nintendo');";

  rol1: string = "INSERT or IGNORE INTO rol(id_rolr, nombrer) VALUES(1, 'Usuario');";
  rol2: string = "INSERT or IGNORE INTO rol(id_rolr, nombrer) VALUES(2, 'Administrador');";
  carrito_generico: string = "INSERT or IGNORE  INTO  carrito (id_carrito, usuario_id) VALUES (1, NULL)";
  admin: string = "INSERT or IGNORE INTO usuario (id_usuariou,emailu,nombre_usuariou,contrasenau,rol_id, rut) VALUES(1,'admin@admin.cl', 'adminfirst','admin123',2, '12345678-9')";

  constructor(private router: Router, private alertController: AlertController, private sqlite: SQLite, private platform: Platform) {
    this.createDatabase();
  }
 


  dbState() {
    return this.isDBReady.asObservable();
  }


  //Guardar conexion
  public database!: SQLiteObject;
  //Observables
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private carritoSubject: BehaviorSubject<CarritoItem[]> = new BehaviorSubject<CarritoItem[]>([]);
  private listaUsuario = new BehaviorSubject([]);
  private listaVideojuego = new BehaviorSubject([]);
  private listavideojuegosN = new BehaviorSubject([]);
  private listavideojuegosx = new BehaviorSubject([]);
  private listavideojuegosP = new BehaviorSubject([]);
  private listavideojuegosPc = new BehaviorSubject([]);
  private listaCompra = new BehaviorSubject([]);
  private listaDetalles = new BehaviorSubject([]);
  private listaItem = new BehaviorSubject([]);
  private listaRol = new BehaviorSubject([]);
  private listaSeccion = new BehaviorSubject([]);
 
 

  fetchusuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  fetchjuego(): Observable<Videojuego[]> {
    return this.listaVideojuego.asObservable();
  }

  fetchjuegoNintendo(): Observable<Videojuego[]> {
    return this.listavideojuegosN.asObservable();
  }

  fetchjuegoPlaystation(): Observable<Videojuego[]> {
    return this.listavideojuegosP.asObservable();
  }
  
  fetchjuegoXbox(): Observable<Videojuego[]> {
    return this.listavideojuegosx.asObservable();
  }
  
  fetchjuegoPc(): Observable<Videojuego[]> {
    return this.listavideojuegosPc.asObservable();
  }
  fetchcompra(): Observable<Compra[]> {
    return this.listaCompra.asObservable();
  }

  obtenerCarrito(): Observable<CarritoItem[]> {
    return this.carritoSubject.asObservable();
  }


  fetchdetalles(): Observable<DetallesC[]> {
    return this.listaDetalles.asObservable();
  }

  fetchitem(): Observable<Item[]> {
    return this.listaItem.asObservable();
  }

  fetchrol(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }
  fetchseccion(): Observable<Seccion[]> {
    return this.listaSeccion.asObservable();
  }


  // crud videojuegos
  buscarJuego() {
    return this.database.executeSql('SELECT * FROM videojuegos', []).then(res => {
      // Variable para almacenar los registros
      let items: Videojuego[] = [];
      // Validamos la cantidad de registros
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Guardar dentro de la variable
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombrev: res.rows.item(i).nombrev,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            imagenv: res.rows.item(i).imagenv,
            seccion_id: res.rows.item(i).seccion_id,
            slug: res.rows.item(i).slug,
          });
        }
      }
      // Actualizamos el observable
      this.listaVideojuego.next(items as any);

      if (items.length === 0) {
        console.log("No se encontraron videojuegos en la base de datos.");
      }
    });
  }
  buscarJuegoporslug(slug: string) {
    return this.database
      .executeSql('SELECT * FROM videojuegos WHERE slug = ?', [slug])
      .then((res) => {
        if (res.rows.length > 0) {
          const videojuego = res.rows.item(0);
          return videojuego;
        } else {
          return null; 
        }
      });
  }

  insertarJuego(nombrev: any, descripcion: any, precio: any, imagenv: any, seccion_id: any, slug: any) {
    return this.database.executeSql('INSERT INTO videojuegos (nombrev,descripcion,precio,imagenv,seccion_id,slug) VALUES (?,?,?,?,?,?)', [nombrev, descripcion, precio, imagenv, seccion_id, slug]).then(res => {
      this.buscarJuego();
      this.buscarJuegoNintendo();
      this.buscarJuegoPlaystation();
      this.buscarJuegoXbox();
      this.buscarJuegoPc();
    })
      .catch(e => {
        this.presentAlert("Error al intertar datos en el videojuego" + e)
      })
  }

  actualizarJuego(id_juego: any, nombrev: any, descripcion: any, precio: any, imagenv: any) {
    return this.database.executeSql('UPDATE videojuegos SET nombrev = ?, descripcion = ?, precio = ?, imagenv = ? WHERE id_juego = ?', [nombrev, descripcion, precio, imagenv, id_juego]).then(res => {
      this.buscarJuego();
      this.buscarJuegoNintendo();
      this.buscarJuegoPlaystation();
      this.buscarJuegoXbox();
      this.buscarJuegoPc();
    })
      .catch(e => {
        this.presentAlert("Error al Actualizar el videojuego" + e)
      })
  }

  borrarJuego(id_juego: any) {
    return this.database.executeSql('DELETE FROM videojuegos WHERE id_juego = ?', [id_juego]).then(res => {
      this.buscarJuego();
      this.buscarJuegoNintendo();
      this.buscarJuegoPlaystation();
      this.buscarJuegoXbox();
      this.buscarJuegoPc();
    })
      .catch(e => {
        this.presentAlert("Error al eliminar el videojuego" + e)
      })
  }

  buscarJuegoPlaystation() {
    return this.database.executeSql('SELECT * FROM videojuegos where seccion_id = 1', []).then(res => {
      // Variable para almacenar los registros
      let items: Videojuego[] = [];
      // Validamos la cantidad de registros
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Guardar dentro de la variable
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombrev: res.rows.item(i).nombrev,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            imagenv: res.rows.item(i).imagenv,
            seccion_id: res.rows.item(i).seccion_id,
            slug: res.rows.item(i).slug,
          });
        }
      }
      // Actualizamos el observable
      this.listavideojuegosP.next(items as any);

      if (items.length === 0) {
        console.log("No se encontraron videojuegos en la base de datos.");
      }
    });
  }
  buscarJuegoXbox() {
    return this.database.executeSql('SELECT * FROM videojuegos where seccion_id = 2', []).then(res => {
      // Variable para almacenar los registros
      let items: Videojuego[] = [];
      // Validamos la cantidad de registros
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Guardar dentro de la variable
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombrev: res.rows.item(i).nombrev,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            imagenv: res.rows.item(i).imagenv,
            seccion_id: res.rows.item(i).seccion_id,
            slug: res.rows.item(i).slug,
          });
        }
      }
      // Actualizamos el observable
      this.listavideojuegosx.next(items as any);

      if (items.length === 0) {
        console.log("No se encontraron videojuegos en la base de datos.");
      }
    });
  }
  buscarJuegoNintendo() {
    return this.database.executeSql('SELECT * FROM videojuegos where seccion_id = 3', []).then(res => {
      // Variable para almacenar los registros
      let items: Videojuego[] = [];
      // Validamos la cantidad de registros
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Guardar dentro de la variable
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombrev: res.rows.item(i).nombrev,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            imagenv: res.rows.item(i).imagenv,
            seccion_id: res.rows.item(i).seccion_id,
            slug: res.rows.item(i).slug,
          });
        }
      }
      // Actualizamos el observable
      this.listavideojuegosN.next(items as any);

      if (items.length === 0) {
        console.log("No se encontraron videojuegos en la base de datos.");
      }
    });
  }
  buscarJuegoPc() {
    return this.database.executeSql('SELECT * FROM videojuegos where seccion_id = 4', []).then(res => {
      // Variable para almacenar los registros
      let items: Videojuego[] = [];
      // Validamos la cantidad de registros
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Guardar dentro de la variable
          items.push({
            id_juego: res.rows.item(i).id_juego,
            nombrev: res.rows.item(i).nombrev,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            imagenv: res.rows.item(i).imagenv,
            seccion_id: res.rows.item(i).seccion_id,
            slug: res.rows.item(i).slug,
          });
        }
      }
      // Actualizamos el observable
      this.listavideojuegosPc.next(items as any);

      if (items.length === 0) {
        console.log("No se encontraron videojuegos en la base de datos.");
      }
    });
  }
  async obtenerJuegoPorId(id: number): Promise<any> {
    return this.database
      .executeSql('SELECT * FROM videojuegos WHERE id_juego = ?', [id])
      .then((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0);
        } else {

          return null;
        }
      })
      .catch((error) => {
        console.error('Error al obtener el juego:', error);
        throw error;
      });
  }
  //funciones carrito
  crearCarrito(usuarioId: string): Promise<number> {
    return this.database.executeSql('INSERT INTO carrito (usuario_id) VALUES (?)', [usuarioId])
      .then(() => {
        // Después de crear un carrito, obtén su ID
        return this.obtenerIdCarritoDeUsuario(usuarioId);
      })
      .catch(error => {
        console.error('Error al crear el carrito:', error);
        throw error;
      });
  }
  
  obtenerIdCarritoDeUsuario(usuarioId: string | null | number): Promise<number> {
    return this.database.executeSql('SELECT id_carrito FROM carrito WHERE usuario_id = ?', [usuarioId])
      .then((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0).id_carrito;
        } else {
          return 1;
        }
      })
      .catch(error => {
        console.error('Error al obtener el ID del carrito:', error);
        throw error;
      });
  }
  obtenerItemsDelCarrito(carrito_id: number): Promise<any[]> {
    return this.database.executeSql('SELECT * FROM itemCarrito WHERE carrito_id = ?', [carrito_id])
      .then((res) => {
        const elementosCarrito: any[] = []; 
        for (let i = 0; i < res.rows.length; i++) {
          elementosCarrito.push(res.rows.item(i));
        }
        return elementosCarrito;
      })
      .catch(error => {
        console.error('Error al obtener los elementos del carrito:', error);
        throw error;
      });
  }

  agregarAlCarrito(videojuego_id: number, cantidad: number, carrito_id: number): Promise<void> {
    return this.database.executeSql('INSERT INTO itemCarrito (videojuego_id, cantidad, carrito_id) VALUES (?, ?, ?)', [videojuego_id, cantidad, carrito_id])
      .then(() => {
        // Después de agregar un videojuego al carrito, actualiza el carrito.
        this.actualizarCarrito(carrito_id);
      })
      .catch(error => {
        console.error('Error al agregar al carrito:', error);
        throw error;
      });
  }
  

  eliminarCarrito(carrito_id: number): Promise<void> {
    return this.database.executeSql('DELETE FROM itemCarrito WHERE carrito_id = ?', [carrito_id])
      .then(() => {
        // Después de eliminar el carrito, actualiza el carrito.
        this.actualizarCarrito(carrito_id);
      })
      .catch(error => {
        console.error('Error al eliminar el carrito:', error);
        throw error;
      });
  }
  
  actualizarCantidadEnCarrito(videojuego_id: number, nuevaCantidad: number, carrito_id: number): Promise<void> {
    return this.database.executeSql('UPDATE itemCarrito SET cantidad = ? WHERE videojuego_id = ? AND carrito_id = ?', [nuevaCantidad, videojuego_id, carrito_id])
      .then(() => {
        this.actualizarCarrito(carrito_id);
      })
      .catch(error => {
        console.error('Error al actualizar la cantidad en el carrito:', error);
        throw error;
      });
  }
  
  actualizarCarrito(carrito_id: number): Promise<void> {
    return this.database.executeSql(
      'SELECT v.*, i.cantidad, i.id_itemcarrito FROM videojuegos v ' +
      'INNER JOIN itemCarrito i ON v.id_juego = i.videojuego_id ' +
      'WHERE i.carrito_id = ?',
      [carrito_id]
    ).then((res) => {
      let carrito: CarritoItem[] = [];

      for (let i = 0; i < res.rows.length; i++) {
        const item = res.rows.item(i);
        carrito.push({
          id_juego: item.id_juego,
          nombrev: item.nombrev,
          descripcion: item.descripcion,
          precio: item.precio,
          imagenv: item.imagenv,
          seccion_id: item.seccion_id,
          slug: item.slug,
          cantidad: item.cantidad,
          id_itemcarrito: item.id_itemcarrito,
          total: 0 
        });
      }

      this.carritoSubject.next(carrito);

    }).catch((error) => {
      console.error('Error al actualizar el carrito:', error);
      throw error;
    });
  }

  async obtenercarro(carritoId: number): Promise<any[]> {
    const elementosCarrito = await this.database.executeSql(
      'SELECT v.*, i.cantidad, i.id_itemcarrito FROM videojuegos v ' +
      'INNER JOIN itemCarrito i ON v.id_juego = i.videojuego_id ' +
      'WHERE i.carrito_id = ?',
      [carritoId]
    )
    .then((res) => {
      const elementos = [];
      for (let i = 0; i < res.rows.length; i++) {
        const item = res.rows.item(i);
        elementos.push({
          id_juego: item.id_juego,
          nombrev: item.nombrev,
          descripcion: item.descripcion,
          precio: item.precio,
          imagenv: item.imagenv,
          seccion_id: item.seccion_id,
          slug: item.slug,
          cantidad: item.cantidad,
          id_itemcarrito: item.id_itemcarrito,
          total: 0 
        });
      }
      return elementos;
    })
    .catch(error => {
      console.error('Error al obtener elementos del carrito:', error);
      throw error;
    });
  
    return elementosCarrito; 
  }

  vaciarCarrito(carritoId: number): Promise<void> {
    return this.database.executeSql('DELETE FROM itemCarrito WHERE carrito_id = ?', [carritoId])
      .then(() => {
        this.actualizarCarrito(carritoId);
      })
      .catch(error => {
        console.error('Error al vaciar el carrito:', error);
        throw error;
      });
  }
  
  obtenerItemCarrito(carrito_id: number, videojuego_id: number): Promise<any> {
    return this.database.executeSql(
      'SELECT * FROM itemCarrito WHERE carrito_id = ? AND videojuego_id = ?',
      [carrito_id, videojuego_id]
    )
    .then((res) => {
      if (res.rows.length > 0) {
        return res.rows.item(0);
      } else {
        return null;
      }
    })
    .catch(error => {
      console.error('Error al obtener el elemento del carrito:', error);
      throw error;
    });
  }

  //funciones del proceso de compra
crearCompra(rutc: string, usuarioId: string | number | null, total: number ): Promise<number> {
  const fechaCompra = new Date(); 
  const opcionesFormato: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    hour12: false 
  };
  
  const formatoFecha = new Intl.DateTimeFormat('es-CL', opcionesFormato);
  const fechaFormateada = formatoFecha.format(fechaCompra);


  return this.database.executeSql(
    'INSERT INTO compra (fechac, rutc, totalc, usuario_id) VALUES (?, ?, ?, ?)',
    [fechaFormateada, rutc, total, usuarioId]
  )
    .then(() => {
      return this.obtenerIdCompra(usuarioId);
    })
    .catch(error => {
      console.error('Error al crear la compra:', error);
      throw error;
    });
}
async crearCompraGenerica(rut: string, total: any): Promise<number> {
  const fechaCompra = new Date();
 
  const opcionesFormato: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    hour12: false 
  };
  
  const formatoFecha = new Intl.DateTimeFormat('es-CL', opcionesFormato);
  const fechaFormateada = formatoFecha.format(fechaCompra);

  return this.database
    .executeSql('INSERT INTO compra (fechac, rutc, totalc) VALUES (?, ?, ?)', [fechaFormateada, rut ,total])
    .then(() => {
      return this.obtenerIdCompra(rut);
    })
    .catch((error) => {
      console.error('Error al crear la compra:', error);
      throw error;
    });
}
async obtenerIdCompraGenerica(rut: string): Promise<number> {
  return this.database
    .executeSql('SELECT id_comprac FROM compra WHERE rutc = ?', [rut])
    .then((res) => {
      if (res.rows.length > 0) {
        return res.rows.item(0).id_comprac;
      } else {
        return 0;
      }
    })
    .catch((error) => {
      console.error('Error al obtener el ID de la compra:', error);
      throw error;
    });
}

obtenerIdCompra(usuarioId: string | null | number): Promise<number> {
  return this.database.executeSql(
    'SELECT id_comprac FROM compra WHERE usuario_id = ?',
    [usuarioId]
  )
    .then((res) => {
      if (res.rows.length > 0) {
        return res.rows.item(0).id_comprac;
      } else {
        return 0;
      }
    })
    .catch(error => {
      console.error('Error al obtener el ID de la compra:', error);
      throw error;
    });
}

async obtenerIdUltimaCompra(usuarioId: string | null | number): Promise<number> {
  return this.database.executeSql(
    'SELECT id_comprac FROM compra WHERE usuario_id = ? ORDER BY id_comprac DESC LIMIT 1',
    [usuarioId]
  )
  .then((res) => {
    if (res.rows.length > 0) {
      return res.rows.item(0).id_comprac;
    } else {
      return null; 
    }
  })
  .catch(error => {
    console.error('Error al obtener el ID de la última compra:', error);
    throw error;
  });
}

async obtenerComprasPorUsuario(usuarioId: number | null | string): Promise<any[]> {
  console.log('Entrando en obtenerComprasPorUsuario');
  try {
    const res = await this.database.executeSql('SELECT * FROM compra WHERE usuario_id = ?', [usuarioId]);
    const compras = [];
    
    for (let i = 0; i < res.rows.length; i++) {
      compras.push(res.rows.item(i));
    }

    console.log('Compras obtenidas:', compras);
    return compras;
  } catch (error) {
    console.error('Error al obtener las compras por usuario:', error);
    throw error;
  }
}

async obtenerDetallesCompraPorId(usuarioid: number | string | null): Promise<any[]> {
  console.log('Entrando en obtenerDetallesCompraPorId');
  try {
    const res = await this.database.executeSql(`
      SELECT d.*, c.*,v.*
      FROM detallesc d 
      JOIN compra c ON c.id_comprac = d.compra_id
      JOIN videojuegos v on d.videojuego_id = v.id_juego
      WHERE c.usuario_id = ?`,
      [usuarioid]
    );

    const detallesCompra = [];

    for (let i = 0; i < res.rows.length; i++) {
      detallesCompra.push(res.rows.item(i)
      
      );
      
    }

    console.log('Detalles obtenidos:', detallesCompra);
    return detallesCompra;
  } catch (error) {
    console.error('Error al obtener los detalles de compra por ID de compra:', error);
    throw error;
  }
  this.verdetalles();
}

async procesarCompraNoRegistrado(rut: string, correo: string, total: any) {
  const compraId = await this.crearCompraGenerica(rut,total);
  const carritoId = 1; 
  const elementosCarrito =  await this.obtenercarro(carritoId);
  const Idcompra  = await this.obtenerIdCompraGenerica(rut);

  for (const elemento of elementosCarrito) {
    await this.agregarDetalleCompra(Idcompra, elemento.id_juego, elemento.cantidad, elemento.precio);
  }

  await this.vaciarCarrito(carritoId);

 
  this.router.navigate(['/home']);
  this.presentAlert('¡Gracias por su compra!');
}

async procesarCompraRegistrado(rut: string, usuarioId: string | null | number, total: any) {
  const compra = await this.crearCompra(rut, usuarioId, total);
  const carritoId = await this.obtenerIdCarritoDeUsuario(usuarioId);
  const elementosCarrito = await this.obtenercarro(carritoId);
  const Idcompra  = await this.obtenerIdUltimaCompra(usuarioId);

  for (const elemento of elementosCarrito) {
    await this.agregarDetalleCompra(Idcompra, elemento.id_juego, elemento.cantidad, elemento.precio);
  }

  this.router.navigate(['/paga-confirmado']); 
}
agregarDetalleCompra(compraId: number, videojuegoId: number, cantidad: number, subtotal: number): Promise<void> {
  return this.database.executeSql(
    'INSERT INTO detallesc (subtotal, cantidad, videojuego_id, compra_id) VALUES (?, ?, ?, ?)',
    [subtotal, cantidad, videojuegoId, compraId]
    
  )
  
    .catch(error => {
      console.error('Error al agregar detalles de la compra:', error);
      throw error;
    });
    this.verdetalles();
}

verdetalles() {
  return this.database.executeSql('SELECT * FROM detallesc', []).then(res => {
    // Variable para almacenar los registros
    let items: DetallesC[] = [];
    // Validamos la cantidad de registros
    if (res.rows.length > 0) {
      // Recorrer el resultado
      for (var i = 0; i < res.rows.length; i++) {
        // Guardar dentro de la variable
        items.push({
          id_detallesc: res.rows.item(i).id_detallesc,
          subtotal: res.rows.item(i).subtotal,
          cantidad: res.rows.item(i).cantidad,
          videojuego_id: res.rows.item(i).videojuego_id,
          compra_id: res.rows.item(i).compra_id,
        });
      }
    }
    // Actualizamos el observable
    this.listaDetalles.next(items as any);
    console.log(items);
    if (items.length === 0) {
      console.log("No se encontraron detalles en la base de datos.");
    }
  });
}

  //crud usuario
  buscarUsuario(): Promise<Usuario[]> {
    
    console.log('Antes de ejecutar la consulta SQL');
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
    console.log('Después de ejecutar la consulta SQL');
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuariou: res.rows.item(i).id_usuariou,
            emailu: res.rows.item(i).emailu,
            nombre_usuariou: res.rows.item(i).nombre_usuariou,
            contrasenau: res.rows.item(i).contrasenau,
            nombreu: res.rows.item(i).nombreu,
            imagenu: res.rows.item(i).imagenu,
            rol_id: res.rows.item(i).rol_id,
            rut: res.rows.item(i).rut,
          })
        }
      }
      this.listaUsuario.next(items as any);
      return items;
    }).catch(error => {
      console.error('Error al buscar usuarios:', error);
      throw error;
    });
  }


  
  async buscarUsuarioPorId(id: any): Promise<Usuario[]> {
    return new Promise<Usuario[]>(async (resolve, reject) => {
      try {
        const res = await this.database.executeSql('SELECT * FROM usuario where id_usuariou = ?', [id]);
        let items: Usuario[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id_usuariou: res.rows.item(i).id_usuariou,
              emailu: res.rows.item(i).emailu,
              nombre_usuariou: res.rows.item(i).nombre_usuariou,
              contrasenau: res.rows.item(i).contrasenau,
              nombreu: res.rows.item(i).nombreu,
              imagenu: res.rows.item(i).imagenu,
              rol_id: res.rows.item(i).rol_id,
              rut: res.rows.item(i).rut,
            });
          }
        }
        resolve(items);
      } catch (error) {
        reject(error);
      }
    });
  }

  
  agregarUsuario(emailu: any, nombre_usuariou: any, contrasenau: any, nombreu: any, rol_id: any, rut: any) {
    return this.database.executeSql('INSERT INTO usuario(emailu, nombre_usuariou, contrasenau, nombreu, rol_id, rut) VALUES(?,?,?,?,?,?)', [emailu, nombre_usuariou, contrasenau, nombreu, rol_id, rut]).then(res => {
      this.buscarUsuario();
    });
  }


  actualizarUsuario(id_usuariou: any, emailu: any, nombre_usuariou: any, nombreu: any, imagenu: any){
    return this.database.executeSql('UPDATE usuario SET emailu = ?, nombre_usuariou = ?, nombreu = ?, imagenu = ? where id_usuariou = ?', [emailu, nombre_usuariou, nombreu, imagenu, id_usuariou]).then(res => {
      console.log('Actualización exitosa');
      this.buscarUsuario();
    }).catch(error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }
  actualizarcontrasena(id_usuariou: any, contrasena: any){
    return this.database.executeSql('UPDATE usuario SET contrasenau = ?  where  id_usuariou = ?',  [contrasena,id_usuariou]).then(res =>{
      this.buscarUsuario();
    })
  }

  borrarUsuario(id_usuariou: any){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuariou = ?', [id_usuariou])
    .then(a =>{
      this.buscarUsuario();
    })
    .catch(e => {
      this.presentAlert("Error al eliminar  Usuario" + e)
    })
  }

  async autenticarUsuario(email: string, contrasena: string): Promise<boolean> {
    try {
      const normalizedEmail = email.toLowerCase();
      const result = await this.database.executeSql(
        'SELECT * FROM usuario WHERE LOWER(emailu) = ? AND contrasenau = ?',
        [normalizedEmail, contrasena]
      );
  
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      return false;
    }
  }

  async obtenerIdUsuarioPorEmail(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.database.executeSql('SELECT id_usuariou FROM usuario WHERE emailu = ?', [email])
        .then(data => {
          if (data.rows.length > 0) {
            resolve(data.rows.item(0).id_usuariou.toString());
          } else {
            reject('Usuario no encontrado');
          }
        })
        .catch(error => reject(error));
    });
  }

    async obtenerRolUsuarioPorEmail(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.database.executeSql('SELECT rol_id FROM usuario WHERE emailu = ?', [email])
        .then(data => {
          if (data.rows.length > 0) {
            resolve(data.rows.item(0).rol_id.toString());
          } else {
            reject('Usuario no encontrado');
          }
        })
        .catch(error => reject(error));
    });
  }




  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }


  removeItem(value: string) {
    localStorage.removeItem(value);
  }

  createDatabase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dbgamezone.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.createTables();
      }).catch(e => {
        this.presentAlert("Error de crear BD: " + e);
      })

    })
  }
  async createTables() {
    try {
      // tablas
      await this.database.executeSql(this.rol, []);
      await this.database.executeSql(this.usuario, []);
      await this.database.executeSql(this.seccion, []);
      await this.database.executeSql(this.juego, []);
      await this.database.executeSql(this.compra, []);
      await this.database.executeSql(this.detalles, []);
      await this.database.executeSql(this.carritoTablas, []);
      await this.database.executeSql(this.item, []);
      //inserciones

      //secciones
      await this.database.executeSql(this.registro_seccion1, []);
      await this.database.executeSql(this.registro_seccion2, []);
      await this.database.executeSql(this.registro_seccion3, []);
      await this.database.executeSql(this.registro_seccion4, []);
        //roles
      await this.database.executeSql(this.rol1, []);
      await this.database.executeSql(this.rol2, []);
        //carrito generico
      await this.database.executeSql(this.carrito_generico, []);
      await this.database.executeSql(this.admin, [])
      


      this.isDBReady.next(true);
      this.buscarJuego();
      this.buscarJuegoNintendo();
      this.buscarJuegoPlaystation();
      this.buscarJuegoXbox();
      this.buscarUsuario();
      this.buscarJuegoPc();
      this.verdetalles();
    } catch (error) {
      this.presentAlert("Error al crear tablas" + error);
      console.error('Error al crear tablas:', error);
    }
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje:',
      cssClass: 'mi-alerta',
      message: msj,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ]
    });

    await alert.present();
  }


  
  


  ngOnInit() { }


}
